import { gameApi, transactionsApi } from './api';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Game {
    constructor({ hash, secret, sockets, onFinish }) {
        this.transactions = [];
        this.onFinish = onFinish;
        this.sockets = sockets;
        this.time = 10;
        this.isStarted = false;
        this.isFinished = false;
        this.isClosedForTransactions = false;
        this.isRouletteStart = false;
        this.isShowWinner = false;
        this.transactionsPool = [];
        this.isWaitingTransactions = false;
        gameApi.execute('create', {
            body: {
                hash,
                secret
            }
        }).then((game) => {
            this.init({ ...game })
        }).catch((err) => {
            console.log(err)
        });
    }

    get users() {
        const uniqueUsers = {};

        this.transactions.map(transaction => {
            uniqueUsers[transaction.user._id] = transaction.user;
        });

        return Object.values(uniqueUsers).sort((a, b) => {
            if (this.bank.users[a._id] < this.bank.users[b._id]) {
                return 1;
            } else if (this.bank[a._id] > this.bank[b._id]) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    get bank() {
        const total = this.transactions.reduce((acc,transaction) => {
            return acc + transaction.value;
        }, 0);

        const users = {};

        this.transactions.forEach(transaction => {
            const userId = transaction.user._id;
            users[userId] = users[userId] ? users[userId] + transaction.value : transaction.value;
        });

        return {
            total,
            users
        };
    }

    get state() {
        return {
            transactions: this.transactions.reverse(),
            hash: this.hash,
            time: this.time,
            isWaitingTransactions: this.isWaitingTransactions,
            transactionsPoolLength: this.transactionsPool.length,
            bank: this.bank,
            users: this.users,
            isShowRoulette: this.isShowRoulette,
            isShowWinner: this.isShowWinner
        }
    }

    init({ _id, hash, secret, transactions }) {
        this._id = _id;
        this.hash = hash;
        this.secret = secret;
        this.transactions = transactions;

        this.sockets.emit('game.reset', this.state);
    }

    start() {
        this.isStarted = true;

        this.sockets.emit('game.start', this.time);
        this.tick();
    }

    async tick() {
        if (this.time > 0) {
            this.time -= 1;
        } else {
            this.sockets.emit('game.waitingTransactions', { transactionsPoolLength: this.state.transactionsPoolLength });
            this.isWaitingTransactions = true;
        }

        this.sockets.emit('game.tick', this.time);

        if (this.time < 5) {
            this.isClosedForTransactions = true;
        }

        if (this.time > 0) {
            setTimeout(this.tick.bind(this), 1000)
        } else {
            if (this.transactionsPool.length) {
                setTimeout(this.tick.bind(this), 1000);
                console.log('Ожидаем все транзакции', this.transactionsPool.length)
            } else {
                this.getWinner();
            }
        }
    }

    async onGameEnd() {
        //обновляем игру
        await gameApi.execute('finish', {
            body: {
                id: this._id
            }
        });
        this.isFinished = true;
        this.onFinish();
    }

    async getWinner() {
        const winner = await gameApi.execute('getWinnerById', {
            body: {
                id: this._id
            }
        });

        this.isShowRoulette = true;
        this.sockets.emit('game.startRoulette');

        setTimeout(() => {
            this.isShowWinner = true;
            this.isFinished = true;

            this.sockets.emit('game.getWinner', {
                winner: winner,
                secret: this.secret
            });

            setTimeout(this.onGameEnd.bind(this), 7000)
        }, 16000);
    }

    join(userData) {
        this.sockets.emit('game.join', userData);
    }

    isFirstUserTransaction(user) {
        return !this.users.filter((_user) => _user._id === user.id).length;
    }

    async transaction(transactionData) {
        return new Promise((async resolve => {
            try {
                const transaction = await transactionsApi.execute('create', {
                    body: {
                        type: 'GAME_CLASSIC',
                        game: this._id,
                        user: transactionData.user.id,
                        value: getRandomInt(200) || transactionData.value,
                    }
                });

                const tickets = {
                    from: 0,
                    to: 10,
                };


                this.transactions.push(transaction);

                if (this.users.length >= 2 && !this.isStarted) {
                // if (!this.isStarted) {
                    this.start();
                }

                this.sockets.emit('game.transaction', { transaction, bank: this.bank, users: this.users });
                resolve();
            } catch (err) {
                console.log(err)
            }
        }))
    }

    async registerTransaction(data) {
        if (this.isClosedForTransactions) {
            return;
        }

        if (this.transactionsPool.length) {
            this.transactionsPool.push(data);
        } else {
            this.transactionsPool.push(data);
            this.loopTransaction()
        }
    }

    async loopTransaction() {
        if (this.transactionsPool.length) {
            const transaction = this.transactionsPool[0];

            await this.transaction(transaction);
            transaction.onAccept();

            this.transactionsPool.shift();
            this.loopTransaction();
        }
    }

    sync(socket) {
        socket.emit('game.sync', this.state);
    }
}

export default Game;

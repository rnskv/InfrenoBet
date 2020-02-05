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

        console.log('Game was created on server serverCopy');
    }

    get users() {
        const uniqueUsers = {};

        this.transactions.map(transaction => {
            uniqueUsers[transaction.user._id] = transaction.user;
        });

        return Object.values(uniqueUsers);
    }

    get state() {
        return {
            users: this.users,
            transactions: this.transactions,
            hash: this.hash,
            time: this.time
        }
    }

    init({ _id, hash, secret, users, transactions }) {
        console.log('init', { _id, hash, secret, transactions });
        this._id = _id;
        this.hash = hash;
        this.secret = secret;
        this.transactions = transactions;

        this.sockets.emit('game.reset', this.state);
    }

    start() {
        console.log('start');
        this.isStarted = true;

        this.sockets.emit('game.start', this.time);
        this.tick();
    }

    tick() {
        console.log('tick', this.time);

        this.time -= 1;
        this.sockets.emit('game.tick', this.time);

        if (this.time > 0) {
            setTimeout(this.tick.bind(this), 1000)
        } else {
            this.getWinner();
            setTimeout(this.onFinish, 5000);
        }
    }

    getWinner() {
        const winner = this.users[getRandomInt(this.users.length - 1)]; // 1-st user win!;
        this.sockets.emit('game.getWinner', {
            winner,
            secret: this.secret
        });
        console.log('getWinner', winner);
    }

    join(userData) {
        console.log('join', userData);

        this.sockets.emit('game.join', userData);

    }

    isFirstUserTransaction(user) {
        return !this.users.filter((_user) => _user._id === user.id).length;
    }

    async transaction(transactionData) {
        const transaction = await transactionsApi.execute('create', {
            body: {
                type: 'GAME_CLASSIC',
                destinationId: this._id,
                user: transactionData.user.id,
                value: transactionData.value,
            }
        });

        const tickets = {
            from: 0,
            to: 10,
        };


        this.transactions.push(transaction);

        if (this.users.length >= 2 && !this.isStarted) {
            this.start();
        }

        console.log(transaction);
        this.sockets.emit('game.transaction', transactionData);
    }

    sync(socket) {
        socket.emit('game.sync', this.state);
    }
}

export default Game;

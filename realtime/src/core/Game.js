import Roulette from 'src/core/Roulette';

import { gameApi, betsApi } from 'src/modules/api';
import { getBetsTotalValue } from  'src/helpers/game';
import config from 'src/config';
import { BET_ACCEPTED } from 'shared/configs/notificationsTypes';

class Game {
    constructor({ hash, secret, app, onFinish }) {
        this.app = app;
        this.roulette = new Roulette({
            sockets: this.app.managers.sockets.io.sockets,
            onEnd: this.onRouletteRotateEnd.bind(this)
        });
        this.bets = [];
        this.onFinish = onFinish;
        this.time = config.rouletteGameTime;
        this.endingTime = 7;
        this.closingGameTime = 5;
        this.maxItemsCount = 50;
        this.maxUserItemsCount = 10;

        this.isStarted = false;
        this.isClosedForBets = false;
        this.isShowWinner = false;
        this.isWaitingLastBets = false;
        this.publicSecret = 0;

        gameApi.execute('create', {
            body: {
                hash,
                secret
            }
        }).then(async (game) => {
            this.init({ ...game });
        }).catch((err) => {
            console.log(err)
        });
    }

    get users() {
        const uniqueUsers = {};

        this.bets.map(bet => {
            uniqueUsers[bet.user._id] = bet.user;
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
        const total = getBetsTotalValue(this.bets);

        const users = {};

        this.bets.forEach(bet => {
            //@todo Опасный участок, если удалить пользователя а транзакцию оставить - все ебанется
            const userId = bet.user._id;

            if (!!users[userId]) {
                users[userId] += bet.item.parent.cost
            } else {
                users[userId] = bet.item.parent.cost;
            }
        });

        return {
            total,
            users
        };
    }

    get state() {
        return {
            bets: this.bets,
            hash: this.hash,
            time: this.time,
            isWaitingLastBets: this.isWaitingLastBets,
            bank: this.bank,
            users: this.users,
            isShowWinner: this.isShowWinner,
            roulette: this.roulette.state,
            secret: this.publicSecret,
        }
    }

    init({ _id, hash, secret, bets }) {
        if (!_id) throw new Error('Ooops, something went wrong');
        this._id = _id;
        this.hash = hash;
        this.secret = secret;
        this.bets = bets;

        this.app.managers.sockets.emitAllUsers({ eventName: 'game.reset', data: this.state});
    }

    async start() {
        this.isStarted = true;

        this.app.managers.sockets.emitAllUsers({ eventName: 'game.start', data: this.time});

        while (this.time > 0) {
            await this.tick();
        }

        if (this.isWaitingLastBets) {
            this.app.managers.sockets.emitAllUsers({ eventName: 'game.waitingLastBets', data: {
                betsQueueLength: null
            }});
        }

        while (this.isWaitingLastBets) {
            await this.tick();
        }

        this.getWinner();
    }

    async tick() {
        return new Promise((resolve) => {
            if (this.time > 0) {
                this.time -= 1;
            }

            if (this.time < this.closingGameTime && !this.roulette.isVisible) {
                this.isClosedForBets = true;
            }

            this.app.managers.sockets.emitAllUsers({ eventName: 'game.tick', data: this.time });
            setTimeout(resolve, 1000)
        });
    }

    async onGameEnd() {
        //обновляем игру
        await gameApi.execute('finish', {
            body: {
                id: this._id
            }
        });
        this.roulette.setVisible(false);
        this.onFinish();
    }

    async getWinner() {
        const winner = await gameApi.execute('getWinnerById', {
            body: {
                id: this._id
            }
        }).catch(err => console.log('GET_WINNER', err));

        this.roulette.start({ winner, bank: this.state.bank, users: this.state.users });
        this.isClosedForBets = false;

        this.time = this.roulette.duration + this.endingTime;

        while (this.roulette.isVisible) {
            await this.tick();
        }

        //@todo вынести в отедльный метод
        this.app.managers.sockets.emitAllUsers({ eventName: 'game.startRoulette' });
    }

    onRouletteRotateEnd(winner) {
        this.isShowWinner = true;
        this.publicSecret = this.secret;

        this.app.managers.sockets.emitAllUsers({ eventName: 'game.getWinner', data: {
            winner,
            secret: this.secret
        } });

        this.app.managers.sockets.emitUserById(winner.bet.user._id, { eventName: 'game.win' });
        //@todo отедльный метод

        setTimeout(this.onGameEnd.bind(this), this.endingTime * 1000)
    }

    join(userData) {
        this.app.managers.sockets.emitAllUsers({ eventName: 'game.join', userData });
    }

    getUserBetsCount(user) {
        return this.bets.filter((bet) => bet.user._id === user._id).length
    }

    getUserBetsCountInQueue(user) {
        return [];
    }

    isFirstUserBet(user) {
        return !this.users.filter((_user) => _user._id === user._id).length;
    }

    async addBet(betData) {
        return new Promise((async resolve => {
            const acceptedBets = [];

            for (const item of betData.items) {
                console.log('API EXECUTE')
                const bet = await betsApi.execute('create', {
                    body: {
                        type: 'GAME_CLASSIC',
                        game: this._id,
                        user: betData.user._id,
                        item: item._id,
                    }
                });

                if (bet.code === 400) {
                    this.app.managers.sockets.emitUserById(betData.user._id, {
                        eventName: 'project.notification',
                        data: {
                            type: bet.type
                        }
                    });
                    continue;
                }

                acceptedBets.unshift(bet)
            }

            for (const acceptedBet of acceptedBets) {
                this.bets.push(acceptedBet);
                console.log(acceptedBet.ticketFrom)
            }

            this.app.managers.sockets.emitUserById(betData.user._id, {
                eventName: 'project.notification',
                data: {
                    type: BET_ACCEPTED
                }
            });

            this.app.managers.sockets.emitAllUsers({ eventName: 'game.bets', data: {
                bets: acceptedBets,
                bank: this.bank,
                users: this.users
            }});

            if (this.users.length >= 2 && !this.isStarted) {
                this.start();
            }

            if (this.bets.length >= this.maxItemsCount) {
                this.time = this.closingGameTime;
            }

            resolve()
        }))
    }

    sync(socket) {
        socket.emit('game.roulette.sync', this.state);
    }
}

export default Game;

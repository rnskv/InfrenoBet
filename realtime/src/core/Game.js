import Roulette from 'src/core/Roulette';

import { gameApi, betsApi } from 'src/modules/api';
import { getBetsTotalValue } from  'src/helpers/game';
import * as notificationsTypes from 'shared/configs/notificationsTypes';
import config from 'src/config';

class Game {
    constructor({ hash, secret, app, betsQueue, onFinish }) {
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
        this.isFinished = false;
        this.isClosedForBets = false;
        this.isShowWinner = false;
        this.betsQueue = betsQueue;
        this.isWaitingLastBets = false;
        this.publicSecret = 0;

        gameApi.execute('create', {
            body: {
                hash,
                secret
            }
        }).then(async (game) => {
            this.init({ ...game });

            if (betsQueue.length) {
                while (this.betsQueue.length) {
                    await this.processFirstBet();
                    this.isWaitingLastBets = !!this.betsQueue.length;
                }
            }
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
                users[userId] += bet.item.cost
            } else {
                users[userId] = bet.item.cost;
            }
        });

        return {
            total,
            users
        };
    }

    get state() {
        return {
            bets: [...this.bets].reverse(),
            hash: this.hash,
            time: this.time,
            isWaitingLastBets: this.isWaitingLastBets,
            betsQueueLength: this.betsQueue.length,
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
                betsQueueLength: this.betsQueue.length
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
        this.isFinished = true;
        this.onFinish({ betsQueue: this.betsQueue });
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
        this.isFinished = true;
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
        return this.betsQueue.filter((bet) => bet.user._id === user._id).reduce((acc, bet) => acc + bet.items.length, 0)
    }

    isFirstUserBet(user) {
        return !this.users.filter((_user) => _user._id === user._id).length;
    }

    async addBet(betData) {
        return new Promise((async resolve => {
            const acceptedBets = [];

            for (const item of betData.items) {
                const bet = await betsApi.execute('create', {
                    body: {
                        type: 'GAME_CLASSIC',
                        game: this._id,
                        user: betData.user._id,
                        item: item._id
                    }
                }).catch(err => console.log(err));

                acceptedBets.unshift(bet)
            }

            for (const acceptedBet of acceptedBets) {
                this.bets.push(acceptedBet);
            }

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

    async registerUserBets(data) {
        if (this.isClosedForBets) {
            return;
        }

        this.isWaitingLastBets = true;

        this.betsQueue.push(data);

        if (this.roulette.isVisible) {
            console.log('Перенарпавляем ставки в следующую игру');
            return;
        }

        const isNeedToStartProcessing = this.betsQueue.length === 1;

        if (isNeedToStartProcessing) {
            while (this.betsQueue.length) {
                await this.processFirstBet();
                this.isWaitingLastBets = !!this.betsQueue.length;
                console.log('Обработка новой ставки!')
            }
        }
    }

    async processFirstBet() {
        const betData = this.betsQueue[0];
        try {
            await this.addBet(betData);
            console.log('Сообщаем пользователю', betData)
            this.app.managers.sockets.emitUserById(betData.user._id, {
                eventName: 'project.notification',
                data: { type: notificationsTypes.BET_ACCEPTED }
            });
        } catch (err) {
            this.app.managers.sockets.emitUserById(betData.user._id, {
                eventName: 'project.notification',
                data: { type: notificationsTypes.INTERNAL_SERVER_ERROR }
            });
        }

        this.betsQueue.shift();
    }

    sync(socket) {
        socket.emit('game.roulette.sync', this.state);
    }
}

export default Game;

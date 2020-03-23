import jwtDecode from 'jwt-decode';
import Room from './Room';
import * as notificationsTypes from 'shared/configs/notificationsTypes';
import { userApi } from 'src/modules/api';
import { getBetsTotalValue, getBetValue } from  'src/helpers/game';
import { BET_SENDING } from 'shared/configs/notificationsTypes';

const socket = require('socket.io');

class Application {
    constructor(server) {
        this.io = socket(server, { serveClient: false });
        this.usersSockets = {};
        this.rooms = {};

        this.createRoom({ id: 'classic'});

        this.io.on('connection', this.onConnection.bind(this));
    }

    createRoom({ id }) {
        this.rooms[id] = new Room({ app: this });
        this.rooms[id].reset();
    }

    onConnection(socket) {
        //@todo Переписать это
        socket.on('error', (error) => {
            console.log('FRIENDSHIP IS MAGIC')
        });

        socket.on('project.logIn', (token) => {
            socket.jwtToken = token;
            socket.user = jwtDecode(token);
            this.addUserSocket(socket);
        });

        socket.on('project.logOut', (token) => {
            delete socket.jwtToken;
            delete socket.user;
        });

        socket.on('disconnect', () => {
            this.removeUserSocket(socket);
        });

        socket.on('game.bet', async (betData) => {
            const { game } = this.rooms['classic'];

            if (!socket.jwtToken) {
                socket.emit('project.notification', { type: notificationsTypes.USER_NOT_AUTH });
                return;
            }

            if (game.isClosedForBets) {
                socket.emit('project.notification', { type: notificationsTypes.GAME_CLOSED_FOR_BETS });
                return;
            }

            if (!betData.items.length) {
                socket.emit('project.notification', { type: notificationsTypes.USER_NOT_SELECT_ITEMS });
                return;
            }

            const totalUserItemsCount = game.getUserBetsCount(socket.user) + game.getUserBetsCountInQueue(socket.user);

            if (
                !game.roulette.isVisible
                    ? totalUserItemsCount + betData.items.length > game.maxUserItemsCount
                    : game.getUserBetsCountInQueue(socket.user) + betData.items.length > game.maxUserItemsCount
            ) {
                socket.emit('project.notification', { type: notificationsTypes.SO_MANY_ITEMS });
                return;
            }
            //Тут проверить надо хватает ли чуваку денег и если да то сразу вычесть их;

            try {
                await userApi.execute('changeBalance', {
                    body: {
                        id: socket.user.id,
                        amount: getBetValue(betData)
                    }
                });

                //Тут надо залогировать все ставки которые купил пользователь
            } catch (err) {
                console.log(err);
                socket.emit('project.notification', { type: notificationsTypes.USER_NOT_ENOUGH_MONEY });
                return;
            }

            socket.emit('project.notification',{
                type: BET_SENDING
            });

            await this.rooms['classic'].game.registerUserBets({
                user: socket.user,
                items: betData.items,
                onAccept: () => {
                    //@todo Сомнительно, и придумай как привязать socket к транзакции...
                    socket.emit('game.betWasAccepted')
                },
                onError: (error) => {
                    socket.emit('project.error', error)
                },
                sendNotification: ({ type, params }) => {
                    socket.emit('project.notification', { type, params })
                }
            });
        });

        socket.on('game.sync', () => {
            this.rooms['classic'].game.sync(socket);
        });
    }

    addUserSocket(socket) {
        if (!socket.user) return;
        if (!this.usersSockets[socket.user.id]) {
            this.usersSockets[socket.user.id] = [socket.id]
        } else {
            this.usersSockets[socket.user.id].push(socket.id);
        }
    }

    removeUserSocket(socket) {
        if (!socket.user) return;
        this.usersSockets[socket.user.id] = this.usersSockets[socket.user.id].filter((socketId) => socketId !== socket.id);
    }
}

export default Application;

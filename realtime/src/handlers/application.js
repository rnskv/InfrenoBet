import jwtDecode from 'jwt-decode';
import * as notificationsTypes from 'shared/configs/notificationsTypes';
import { userApi } from 'src/modules/api';
import { BET_SENDING } from 'shared/configs/notificationsTypes';
import { getBetValue } from 'src/helpers/game';

export default function ({ app }) {
    return function (socket) {
        //@todo Переписать это
        socket.on('error', (error) => {
            console.log('FRIENDSHIP IS MAGIC')
        });

        socket.on('project.logIn', (token) => {
            socket.jwtToken = token;
            socket.user = jwtDecode(token);
            if (!socket.user) return;
            app.managers.sockets.addSocketToUserById(socket.user._id, { socket });
        });

        socket.on('project.logOut', (token) => {
            if (!socket.user) return;
            app.managers.sockets.removeSocketFromUserById(socket.user._id, { socket });
            delete socket.jwtToken;
            delete socket.user;
        });

        socket.on('disconnect', () => {
            if (!socket.user) return;
            app.managers.sockets.removeSocketFromUserById(socket.user._id, { socket });
        });

        socket.on('game.roulette.bet', async (betData) => {
            const { game } = app.managers.rooms.get('roulette');
            const { user } = socket;

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

            if (
                game.getUserBetsCount(user) + betData.items.length > game.maxUserItemsCount
            ) {
                this.app.managers.sockets.emitUserById(user._id, {
                    eventName: 'project.notification',
                    data: {
                        type:  notificationsTypes.SO_MANY_ITEMS
                    }
                });
                return;
            }

            socket.emit('project.notification',{
                type: BET_SENDING
            });

            app.managers.redis.rpush('game.roulette.bets', JSON.stringify(
                {
                    user: user,
                    items: betData.items
                }
            ), async (response) => {
                try {
                    await userApi.execute('changeBalance', {
                        body: {
                            id: user._id,
                            amount: getBetValue(betData)
                        }
                    });
                    //Тут надо залогировать все ставки которые купил пользователь
                } catch (err) {
                    console.log(err);
                    socket.emit('project.notification', { type: notificationsTypes.USER_NOT_ENOUGH_MONEY });
                    return;
                }
                console.log('Значение в редиску установлено', response)
            });
        });

        socket.on('game.roulette.sync', () => {
            app.managers.rooms.get('roulette').game.sync(socket);
        });
    }
}

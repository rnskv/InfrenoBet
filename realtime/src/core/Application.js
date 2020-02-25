import jwtDecode from 'jwt-decode';
import Room from './Room';
import * as notificationsTypes from 'shared/configs/notificationsTypes';

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

        socket.on('project.auth', (token) => {
            socket.jwtToken = token;
            socket.user = jwtDecode(token);
            this.addUserSocket(socket);
        });

        socket.on('disconnect', () => {
            this.removeUserSocket(socket);
        });

        socket.on('game.transaction', async (transactionData) => {
            if (!socket.jwtToken) {
                socket.emit('project.error', { type: notificationsTypes.USER_NOT_AUTH });
                return;
            }

            if (this.rooms['classic'].game.isClosedForTransactions) {
                socket.emit('project.error', { type: notificationsTypes.GAME_CLOSED_FOR_TRANSACTIONS });
            }
            //Тут проверить надо хватает ли чуваку денег и если да то сразу вычесть их;

            await this.rooms['classic'].game.registerTransactionsBlock({
                user: socket.user,
                values: transactionData.values,
                onAccept: () => {
                    //@todo Сомнительно, и придумай как привязать socket к транзакции...
                    socket.emit('game.transactionAccepted')
                },
                onError: (error) => {
                    socket.emit('user.error', error)
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
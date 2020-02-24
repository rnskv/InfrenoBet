import jwtDecode from 'jwt-decode';
import Room from './Room';
import { application } from '../app';

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
        this.rooms[id] = new Room({ sockets: this.io.sockets });
        this.rooms[id].reset();
    }

    onConnection(socket) {
        socket.on('error', (error) => {
            console.log('FRIENDSHIP IS MAGIC')
        });

        socket.on('project.auth', (token) => {
            socket.jwtToken = token;
            socket.user = jwtDecode(token);
            this.addUserSocket(socket);
            console.log(this.usersSockets);
        });

        socket.on('disconnect', () => {
            this.removeUserSocket(socket);
            console.log(this.usersSockets);
        });

        socket.on('game.transaction', async (transactionData) => {
            if (!socket.jwtToken) {
                socket.emit('project.error', { message: 'Unauthorization' });
                return;
            }

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

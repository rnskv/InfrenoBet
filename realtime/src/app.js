import express from 'express';
import http from 'http';
import crypto from 'crypto';
import jwtDecode from 'jwt-decode';
import Connection from 'src/core/Connection';

// import SocketIO from 'socket.io';
import Room from './core/Room';
import { userApi} from './modules/api';

const app = express();
export const server = http.Server(app);
export const connection = new Connection(server);
const room = new Room({ sockets: connection.io.sockets });

room.reset();

connection.io.use((socket, next) => {
   next();
});

connection.io.on('connection', (socket) => {
    socket.on('error', (error) => {
        console.log('FRINEDSHIP IS MAGIC')
    });

    socket.on('project.auth', (token) => {
        socket.jwtToken = token;
        socket.user = jwtDecode(token);
    });

    socket.on('game.transaction', (transactionData) => {
        if (!socket.jwtToken) {
            socket.emit('project.error', { message: 'Unauthorization' });
            return;
        }

        console.log('register transaction')
        room.game.registerTransaction({
            user: socket.user,
            value: 50,
            onAccept: () => {
                socket.emit('game.transactionAccepted')
            },
            onError: (error) => {
                socket.emit('user.error', error)
            }
        });
    });

    socket.on('game.sync', () => {
        room.game.sync(socket);
    });
});

server.listen(3000);

import express from 'express';
import http from 'http';
import crypto from 'crypto';
import jwtDecode from 'jwt-decode';

// import SocketIO from 'socket.io';
import Room from './core/Room';
import { userApi} from './modules/api';

let app = express();
let server = http.Server(app);
const io = require('socket.io')(server, { serveClient: false });


const room = new Room({ sockets: io.sockets });

room.reset();

io.use((socket, next) => {
   next();
});

io.on('connection', (socket) => {
    socket.on('project.auth', (token) => {
        socket.jwtToken = token;
        socket.user = jwtDecode(token);
        // console.log(socket.user)
    });

    socket.on('game.transaction', (transactionData) => {
        if (!socket.jwtToken) {
            socket.emit('project.error', { message: 'Unauthorization' });
            return;
        }

        console.log('register transaction')
        room.game.registerTransaction({ user: socket.user, value: 50, onAccept: () => {
            socket.emit('game.transactionAccepted')
        }});
    });

    socket.on('game.sync', () => {
        room.game.sync(socket);
    });
});

server.listen(3000);

import express from 'express';
import http from 'http';
import crypto from 'crypto';
import jwtDecode from 'jwt-decode';

// import SocketIO from 'socket.io';
import Game from './modules/Game';
import { userApi} from './modules/api';

let app = express();
let server = http.Server(app);
const io = require('socket.io')(server, { serveClient: false });

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


class Room {
    constructor(io) {
        this.gamesCount = 0;

        this.io = io;
        this.game = null;
    }

    initialize() {
        console.log('reset game');
        this.gamesCount++;
        const secret = Math.random();
        const hash = crypto.createHash('md5').update(String(secret)).digest("hex");

        this.game = new Game({
            hash,
            secret,
            sockets: this.io.sockets,
            onFinish: this.onFinish.bind(this)
        });
    }

    onFinish() {
        this.initialize();
    }
}

const room = new Room({ sockets: io.sockets });

room.initialize();

io.use((socket, next) => {
   next();
});

io.on('connection', (socket) => {
    console.log('connected');
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
        setTimeout(async () => {
            await room.game.registerTransaction({ user: socket.user, value: 50, onAccept: () => {
                socket.emit('game.me.transaction')
            }});
        }, 0)
    });

    socket.on('game.sync', () => {
        room.game.sync(socket);
    });
});

server.listen(3000);

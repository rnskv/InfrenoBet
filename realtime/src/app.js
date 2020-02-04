import express from 'express';
import http from 'http';
// import SocketIO from 'socket.io';
import Game from './modules/Game';

let app = express();
let server = http.Server(app);
const io = require('socket.io')(server, { serveClient: false });

class Room {
    constructor(io) {
        this.io = io;
        this.game = null;
    }

    initialize() {
        console.log('reset game');
        this.game = new Game({
            sockets: this.io.sockets,
            onFinish: this.onFinish.bind(this)
        });

        io.sockets.emit('game.reset', this.game.state);
    }

    onFinish() {
        this.initialize();
    }
}

const room = new Room({ sockets: io.sockets });

room.initialize();

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('game.join', (userData) => {
        room.game.join(userData);
    });

});

server.listen(3000)

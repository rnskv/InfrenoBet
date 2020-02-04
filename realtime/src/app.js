import express from 'express';
import http from 'http';
// import SocketIO from 'socket.io';

let app = express();
let server = http.Server(app);
const io = require('socket.io')(server, { serveClient: false });

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('game.join', (user) => {
        console.log(user, 'try join to game');
        io.sockets.emit('game.join', { name: 'Vasya' })
    })
});

server.listen(3000)

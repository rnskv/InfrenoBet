import express from 'express';
import http from 'http';
import socket from 'socket.io';

import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

import SocketsManager from './managers/SocketsManager';
import handlers from './handlers/application';

const app = express();
const server = http.Server(app);

const infernoIO = new Application(server);

const socketsManager = new SocketsManager();

infernoIO.addManager('sockets', socketsManager);

infernoIO.init();

socketsManager.init({ handlers });
socketsManager.connect({ socket, server });

infernoIO.createRoom({ id: 'roulette'});

server.listen(config.realtime_port, config.realtime_host);

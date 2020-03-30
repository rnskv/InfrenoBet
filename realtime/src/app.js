import express from 'express';
import http from 'http';
import socket from 'socket.io';

import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

import SocketsManager from './managers/SocketsManager';
import RoomsManager from './managers/RoomsManager';
import handlers from './handlers/application';

import SteamPlugin from './plugins/steam';

const app = express();
const server = http.Server(app);

const infernoIO = new Application(server);

const socketsManager = new SocketsManager();
const roomsManager = new RoomsManager();

infernoIO.addManager('sockets', socketsManager);
infernoIO.addManager('rooms', roomsManager);
infernoIO.addPlugin('steam', SteamPlugin);

infernoIO.init();

socketsManager.init({ handlers });
socketsManager.connect({ socket, server });

roomsManager.create('roulette');

server.listen(config.realtime_port, config.realtime_host);

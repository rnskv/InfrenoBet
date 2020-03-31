import express from 'express';
import http from 'http';
import socket from 'socket.io';
const redis = require("redis");

import { spawn, execFile } from 'child_process';

import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

import SocketsManager from './managers/SocketsManager';
import RoomsManager from './managers/RoomsManager';
import handlers from './handlers/application';
import RedisManager from './managers/RedisManager';

const app = express();
const server = http.Server(app);

const infernoIO = new Application(server);

const socketsManager = new SocketsManager();
const roomsManager = new RoomsManager();
const redisManager = new RedisManager({ client: redis.createClient({
    host: config.redisHost,
    port: config.redisPort
}) });

infernoIO.addManager('sockets', socketsManager);
infernoIO.addManager('rooms', roomsManager);
infernoIO.addManager('redis', redisManager);
// infernoIO.addPlugin('steam', SteamPlugin);

infernoIO.init();

socketsManager.init({ handlers });
socketsManager.connect({ socket, server });

roomsManager.create('roulette');

server.listen(config.realtime_port, config.realtime_host);

import express from 'express';
import http from 'http';
import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

const app = express();
const server = http.Server(app);

const infernoIO = new Application(server);

server.listen(config.realtime_port, config.realtime_host);

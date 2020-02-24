import express from 'express';
import http from 'http';
import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

const app = express();
export const server = http.Server(app);
export const application = new Application(server);


server.listen(config.realtime_port);

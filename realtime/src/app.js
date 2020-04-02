import express from 'express';
import http from 'http';
import socket from 'socket.io';
const redis = require("redis");
import { userApi } from 'src/modules/api';

import { spawn, execFile } from 'child_process';

import jwtDecode from 'jwt-decode';
import Application from 'src/core/Application';
import config from './config';
import Room from './core/Room';

import SocketsManager from './managers/SocketsManager';
import RoomsManager from './managers/RoomsManager';
import handlers from './handlers/application';
import RedisManager from './managers/RedisManager';
import * as notificationsTypes from 'shared/configs/notificationsTypes';

const app = express();
const server = http.Server(app);

const infernoIO = new Application(server);

const socketsManager = new SocketsManager();
const roomsManager = new RoomsManager();

const redisManager = new RedisManager({
    client: redis.createClient({
        host: config.redisHost,
        port: config.redisPort
    }),
    sub: redis.createClient({
        host: config.redisHost,
        port: config.redisPort
    }),
    pub: redis.createClient({
        host: config.redisHost,
        port: config.redisPort
    }),
});

infernoIO.addManager('sockets', socketsManager);
infernoIO.addManager('rooms', roomsManager);
infernoIO.addManager('redis', redisManager);
// infernoIO.addPlugin('steam', SteamPlugin);

infernoIO.init().then((app) => {
    app.managers.redis.subscribe('user.notifications.add');
    app.managers.redis.subscribe('user.inventory.add');
    app.managers.redis.on('message', (channel, message) => {
        console.log('redis учуял кровь!', channel);
        switch (channel) {
            case 'user.notifications.add': {
                const { userId, type } = JSON.parse(message);
                if (!userId) return;
                app.managers.sockets.emitUserById(userId, {
                    eventName: 'project.notification',
                    data: {
                        type
                    }
                });
            }

            case 'user.inventory.add': {
                const { user, items } = JSON.parse(message);

                if (!user) return;

                app.managers.sockets.emitUserById(user._id, {
                    eventName: 'project.notification',
                    data: {
                        type:  notificationsTypes.TRADEOFFER_ACCEPTED
                    }
                });

                userApi.execute('addInventory', {
                   body: {
                       user,
                       items
                   }
                }).then((response) => {
                    app.managers.sockets.emitUserById(user._id, {
                        eventName: 'project.notification',
                        data: {
                            type:  notificationsTypes.INVENTORY_ITEMS_ADDED
                        }
                    });
                }).catch(err => {
                    console.log('Ошибка при обновлении инвентаря', err)
                });

                break;
            }
        }
    })

});

socketsManager.init({ handlers });
socketsManager.connect({ socket, server });

roomsManager.create('roulette');

server.listen(config.realtime_port, config.realtime_host);

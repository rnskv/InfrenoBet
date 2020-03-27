import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
const request = require('request-promise');

import { USER_ALREADY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD, USER_WRONG_REGISTER_DATA } from 'shared/configs/notificationsTypes';
const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URL, VK_CLOSE_PAGE_URL } = process.env;

function unitPayHandler(ctx) {
    console.log('Oh nihuya');

    ctx.body = {
        result: {
            message: "Обработчик unitpay инициализирован"
        }
    }
}

function freeKassaHandler(ctx) {
    console.log('Oh nihuya');
    ctx.body = {
        result: {
            message: "Обработчик freekassa инициализирован"
        }
    }
}

export const unitPay = new Action({
    method: 'get',
    url: '/unitpay',
    handler: unitPayHandler,
});

export const freecassaPay = new Action({
    method: 'get',
    url: '/freekassa',
    handler: freeKassaHandler,
});

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';

import freekassa from 'freekassa-node';
const request = require('request-promise');

import { USER_ALREADY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD, USER_WRONG_REGISTER_DATA } from 'shared/configs/notificationsTypes';
const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URL, VK_CLOSE_PAGE_URL } = process.env;

function unitPayHandler(ctx) {
    console.log('pay unit');

    ctx.body = {
        result: {
            message: "Обработчик unitpay инициализирован"
        }
    }
}

function freeKassaHandler(ctx) {
    const {
        MERCHANT_ID,
        AMOUNT,
        intid,
        MERCHANT_ORDER_ID,
        P_EMAIL,
        P_PHONE,
        CUR_ID,
        SIGN,
        us_key,
    } = ctx.request.query;

    console.log('Пришла платежка', {
        MERCHANT_ID,
        AMOUNT,
        intid,
        MERCHANT_ORDER_ID,
        P_EMAIL,
        P_PHONE,
        CUR_ID,
        SIGN,
        us_key,
    });

    ctx.body = {
        result: {
            message: "Обработчик freekassa инициализирован"
        }
    }
}

function freeKassaRedirectHandler(ctx) {
    console.log('redirect to freekassa');

    const SECRET_WORD_1 = 'l2tz7nn9';
    const SECRET_WORD_2 = 'eevxffrj';

    const shopID = 198358;
    const userID = 1337;
    const amount = 4; // in USD

    console.log('Redirect to robokassa system');
    const signature = freekassa({
        "AMOUNT": amount,
        "MERCHANT_ORDER_ID": userID,
        "MERCHANT_ID": shopID,
    }, SECRET_WORD_2);

    const paymentForm = freekassa({
        "oa": amount,
        "o": userID,
        "m": shopID,
    }, SECRET_WORD_1);

    ctx.redirect(paymentForm.url);
}

export const unitPay = new Action({
    method: 'get',
    url: '/unitpay',
    handler: unitPayHandler,
});

export const freekassaRedirect = new Action({
    method: 'get',
    url: '/freekassa/redirect',
    handler: freeKassaRedirectHandler
});

export const freekassaPay = new Action({
    method: 'get',
    url: '/freekassa',
    handler: freeKassaHandler,
});

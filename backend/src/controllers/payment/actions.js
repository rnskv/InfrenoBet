import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';

import FreekassaPayment from 'src/models/FreekassaPayment';
import freekassa from 'freekassa-node';
const request = require('request-promise');

import { USER_ALREADY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD, USER_WRONG_REGISTER_DATA } from 'shared/configs/notificationsTypes';
const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URL, VK_CLOSE_PAGE_URL } = process.env;

const SECRET_WORD_1 = 'l2tz7nn9';
const SECRET_WORD_2 = 'eevxffrj';

const shopID = 198358;

function unitPayHandler(ctx) {
    console.log('pay unit');

    ctx.body = {
        result: {
            message: "Обработчик unitpay инициализирован"
        }
    }
}

async function freeKassaGetUserPaymentHandler(ctx) {
    ctx.body = await FreekassaPayment.getByUserId(ctx.params.id);
}

async function freeKassaGetAllHandler(ctx) {
    ctx.body = await FreekassaPayment.getAll(ctx.params);
}

async function freeKassaHandler(ctx) {
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

    const signature = freekassa({
        "AMOUNT": AMOUNT,
        "MERCHANT_ORDER_ID": MERCHANT_ORDER_ID,
        "MERCHANT_ID": shopID,
    }, SECRET_WORD_2);

    const payment = await FreekassaPayment.create({
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

    const user = await User.changeBalance(MERCHANT_ORDER_ID, AMOUNT);

    console.log('created', payment, signature, user);

    ctx.body = 'YES';
}

function freeKassaRedirectHandler(ctx) {
    console.log('redirect to freekassa', ctx.request.body);
    const userID = ctx.state.user._id;
    const amount = ctx.request.body.amount; // in USD

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

    ctx.body = {
        url: paymentForm.url
    };
    // ctx.redirect(paymentForm.url);
}

export const unitPay = new Action({
    method: 'get',
    url: '/unitpay',
    handler: unitPayHandler,
});

export const freekassaRedirect = new Action({
    method: 'post',
    url: '/freekassa/redirect',
    handler: freeKassaRedirectHandler,
    middleware: passport.authenticate('jwt')
});

export const freekassaPay = new Action({
    method: 'post',
    url: '/freekassa',
    handler: freeKassaHandler,
});

export const freekassaGetAll = new Action({
    method: 'get',
    url: '/freekassa',
    handler: freeKassaGetAllHandler,
});

export const freekassaGetByUserId = new Action({
    method: 'get',
    url: '/freekassa/:id',
    handler: freeKassaGetUserPaymentHandler,
});

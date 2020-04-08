import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import * as notificationsTypes from 'shared/configs/notificationsTypes';

import FreekassaPayment from 'src/models/FreekassaPayment';
import Deposit from 'src/models/Deposit';
import freekassa from 'freekassa-node';
import accessMiddleware from 'src/middlewares/check-access';

import { USER_ALREADY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD, USER_WRONG_REGISTER_DATA } from 'shared/configs/notificationsTypes';
import notifications from 'shared/configs/notifications';
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

async function getMyDepositsHandler(ctx) {
    ctx.body = await Deposit.getByUserId(ctx.state.user._id);
}

async function getUserDepositsHandler(ctx) {
    ctx.body = await Deposit.getByUserId(ctx.params.id);
}

async function getAllDepositsHandler(ctx) {
    ctx.body = await Deposit.getAll(ctx.params);
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
    } = ctx.request.body;

    try {
        await Deposit.create({
            user: MERCHANT_ORDER_ID,
            amount: AMOUNT,
            system: 'FREE_KASSA',
            status: 'SUCCESS'
        });

        await FreekassaPayment.create({
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

        await User.changeBalance(MERCHANT_ORDER_ID, AMOUNT);
    } catch (err) {
        ctx.throw({ type: notificationsTypes.INTERNAL_SERVER_ERROR })
    }


    ctx.body = 'YES';
}

async function freeKassaRedirectHandler(ctx) {
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
    middlewares: [passport.authenticate('jwt')]
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
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 1 })]
});

export const freekassaGetByUserId = new Action({
    method: 'get',
    url: '/freekassa/:id',
    handler: freeKassaGetUserPaymentHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 1 })]
});


export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllDepositsHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 1 })]
});

export const getAllByUserId = new Action({
    method: 'get',
    url: '/:id',
    handler: getUserDepositsHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 1 })]
});

export const getMy = new Action({
    method: 'get',
    url: '/deposits/my',
    handler: getMyDepositsHandler,
    middlewares: [passport.authenticate('jwt')]
});

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import * as notificationsTypes from 'shared/configs/notificationsTypes';

import FreekassaPayment from 'src/models/FreekassaPayment';
import Deposit from 'src/models/Deposit';
import Withdraw from 'src/models/Withdraw';
import freekassa from 'freekassa-node';
import accessMiddleware from 'src/middlewares/check-access';
import { USER_NOT_ENOUGH_MONEY, WITHDRAW_ERROR_DATA_QIWI, WITHDRAW_ERROR_MIN_AMOUNT } from 'shared/configs/notificationsTypes';

async function createWithdraw(ctx) {
    const { user } = ctx.state;
    const { phone, amount } = ctx.request.body;

    if (!phone) {
        ctx.throw({ type: WITHDRAW_ERROR_DATA_QIWI });
        return;
    } else {
        // if (false) { //тут валидацию номера добавить надо
        //     ctx.throw({ type: WITHDRAW_ERROR_DATA_QIWI });
        //     return;
        // }
    }

    if (!amount) {
        ctx.throw({ type: WITHDRAW_ERROR_DATA_QIWI });
        return;
    } else {
        if (amount < 2) {
            ctx.throw({ type: WITHDRAW_ERROR_MIN_AMOUNT });
        }
    }

    if (amount > user.balance) {
        ctx.throw({ type: USER_NOT_ENOUGH_MONEY });
        return;
    }

    const createdWithdraw = await Withdraw.create({
        user: user._id,
        amount: amount,
        destination: phone,
        system: 'QIWI',
        status: 'CREATED',
    });

    console.log('Create withdraw for user', createdWithdraw.user);

    ctx.body = createdWithdraw
}

function updateWithdraw(ctx) {
    ctx.body = 'ok'
}

function getWithdraw(ctx) {
    ctx.body = 'ok'
}

function getAllWithdraws(ctx) {
    ctx.body = 'ok'
}


async function getUserWithdraws(ctx) {
    const withdraws = await Withdraw.getByUserId(ctx.body.id);
    console.log('Get user withdraws', withdraws);
    ctx.body = withdraws
}

function getAllWithdraw(ctx) {
    ctx.body = 'ok'
}

async function getMyWithdraws(ctx) {
    const withdraws = await Withdraw.getByUserId(ctx.state.user._id);

    ctx.body = withdraws
}

export const getMy = new Action({
    method: 'get',
    url: '/my',
    handler: getMyWithdraws,
    middlewares: [passport.authenticate('jwt')]
});


export const create = new Action({
    method: 'post',
    url: '/',
    handler: createWithdraw,
    middlewares: [passport.authenticate('jwt')]
});


export const update = new Action({
    method: 'put',
    url: '/:id',
    handler: updateWithdraw,
    middlewares: [passport.authenticate('jwt'), accessMiddleware(100)]
});


export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllWithdraws,
    middlewares: [passport.authenticate('jwt'), accessMiddleware(100)]
});

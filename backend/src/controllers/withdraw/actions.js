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


function createWithdraw(ctx) {
    ctx.body = 'ok'
    //ПЕРВОЕ
}

function updateWithdraw(ctx) {
    ctx.body = 'ok'
    //ТРЕТЬЕ
}

function getWithdraw(ctx) {
    ctx.body = 'ok'
}

function getAllWithdraws(ctx) {
    ctx.body = 'ok'
    //ВТОРОЕ
}


function getUserWithdraws(ctx) {
    ctx.body = 'ok'
}

function getAllWithdraw(ctx) {
    ctx.body = 'ok'
}

function getMyWithdrawa(ctx) {
    ctx.body = 'ok'
}

export const getMy = new Action({
    method: 'get',
    url: '/my',
    handler: getUserWithdraws,
    middlewares: [passport.authenticate('jwt')]
});


export const create = new Action({
    method: 'post',
    url: '/my',
    handler: createWithdraw,
    middlewares: [passport.authenticate('jwt')]
});


export const update = new Action({
    method: 'put',
    url: '/',
    handler: updateWithdraw,
    middlewares: [passport.authenticate('jwt'), accessMiddleware(100)]
});


export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllWithdraws,
    middlewares: [passport.authenticate('jwt'), accessMiddleware(100)]
});

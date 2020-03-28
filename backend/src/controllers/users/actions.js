import mongoose from 'mongoose';
import passport from 'koa-passport';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from 'src/models/User';
import config from '../../config';

import { USER_NOT_FOUND } from 'shared/configs/notificationsTypes';

const changeBalanceHandler = async (ctx) => {
    const { id, amount } = ctx.request.body;

    ctx.body = await User.changeBalance(id, -amount);
};

const getHandler = async (ctx) => {
    const user = await User.findById(mongoose.Types.ObjectId(String(ctx.params._id)));

    if (!user) {
        ctx.throw({ type: USER_NOT_FOUND });
    }

    ctx.body = user
};

const getAllHandler = async (ctx) => {
    ctx.body = 'getAllHandler'
};

const getMeHandler = async (ctx) => {
    console.log('get me');

    ctx.body = {
        profile: ctx.state.user
    };
};

export const getMe = new Action({
    method: 'get',
    url: '/me',
    middlewares: [passport.authenticate('jwt')],
    handler: getMeHandler,
});

export const get = new Action({
    method: 'get',
    url: '/:id',
    handler: getHandler,
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

export const changeBalance = new Action({
    method: 'put',
    url: '/changeBalance',
    handler: changeBalanceHandler,
});

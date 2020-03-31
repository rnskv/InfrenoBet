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

const getInventoryHandler = async (ctx) => {
    ctx.body = await User.getById(ctx.params.id);
};

const addInventoryHandler = async (ctx) => {
    const { user, items } = ctx.request.body;

    const currentUser = await User.getBySteamId(user.steamId);
    const itemsIds = items.map((item) => item._id);

    console.log(currentUser.inventory);

    // currentUser.inventory = currentUser.inventory || [];
    currentUser.inventory = [...currentUser.inventory, ...itemsIds];
    await currentUser.save();

    console.log('Добавляем вещи в инвентарь', user, items);

    ctx.body = {
        message: 'Вещи в инвентарь были добавлены'
    }
};

const getAllHandler = async (ctx) => {
    ctx.body = 'getAllHandler'
};

const getMeHandler = async (ctx) => {
    console.log('get me', ctx.state.user);

    ctx.body = {
        profile: await User.getById(ctx.state.user._id)
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

export const addInventory = new Action({
    method: 'put',
    url: '/inventory',
    handler: addInventoryHandler
});

export const getInventory = new Action({
    method: 'get',
    url: '/inventory/:id',
    handler: getInventoryHandler
});

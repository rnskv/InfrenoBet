import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';

import { USER_ALREAY_EXIST, USER_NOT_FOUND } from 'src/types/errors';

const getHandler = async (ctx) => {
    const user = await User.findById(mongoose.Types.ObjectId(String(ctx.params.id)));

    console.log('Execute getHandler', ctx.request.body);

    if (!user) {
        ctx.throw(USER_NOT_FOUND);
    }

    ctx.body = user
};

const getAllHandler = async (ctx) => {
    ctx.body = 'getAllHandler'
};

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

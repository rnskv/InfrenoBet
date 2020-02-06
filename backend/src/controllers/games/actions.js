import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Game from 'src/models/Game';
import config from 'src/config';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    const {
        secret,
        hash
    } = ctx.request.body;

    const existedGame = await Game.getLastCreated();

    if (existedGame) {
        ctx.body = existedGame;
    } else {
        ctx.body = await Game.create({ secret, hash })
    }
};

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

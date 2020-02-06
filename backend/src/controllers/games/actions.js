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
    console.log('Game is exist', existedGame)
    if (existedGame) {
        ctx.body = existedGame;
    } else {
        ctx.body = await Game.create({ secret, hash })
    }
};

const getWinner = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    ctx.body = await Game.getWinnerById(id);
};

const finishGame = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    await Game.updateOne({ _id: mongoose.Types.ObjectId(id)}, { $set: {
        status: 'FINISHED'
    }});

    ctx.body = {
        ok: true
    }
};

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

export const getWinnerById = new Action({
    method: 'post',
    url: '/winner',
    handler: getWinner,
});

export const finishById = new Action({
    method: 'post',
    url: '/finish',
    handler: finishGame,
});

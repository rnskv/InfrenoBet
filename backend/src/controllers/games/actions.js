import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Game from 'src/models/Game';
import User from 'src/models/User';
import Bet from 'src/models/Bet';

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

const getWinner = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    const winner = await Game.getWinnerById(id);
    const bank = await Bet.getGameBankSumById(id);
    //@todo 0.9 - процент отдаци пользователю (вынести в настройки)
    await User.changeBalance(winner.bet.user._id, bank.sum * 0.90);

    ctx.body = winner;
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

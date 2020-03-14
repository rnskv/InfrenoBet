import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transaction from 'src/models/Transaction';
import Game from 'src/models/Game';
import User from 'src/models/User';

import config from 'src/config';

import { USER_NOT_ENOUGH_MONEY } from 'src/types/errors';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    const {
        user,
        value,
        game,
        type
    } = ctx.request.body;

    const lastTransaction = await Transaction.getLastInGameByGameId(game);

    let ticketFrom = 1;
    let ticketTo = value;

    if (lastTransaction) {
        const lastGameTicket = lastTransaction.ticketTo;
        ticketFrom += lastGameTicket;
        ticketTo += lastGameTicket;
    }

    const transaction = await Transaction.create({
        user: mongoose.Types.ObjectId(user),
        game: mongoose.Types.ObjectId(game),
        value,
        type,
        ticketFrom,
        ticketTo
    });

    switch (transaction.type) {
        case 'GAME_CLASSIC': {
            const game = await Game.findById(transaction.game);
            game.transactions.push(transaction._id);
            await game.save();

            break;
        }

        default: {
            break;
        }
    }

    ctx.body = await Transaction.getById(transaction._id);
};

const getGameBankSumById = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    ctx.body = await Transaction.getGameBankSumById(id);
};

export const getBankSunById = new Action({
    method: 'post',
    url: '/bank',
    handler: getGameBankSumById
});

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transaction from 'src/models/Transaction';
import Game from 'src/models/Game';
import User from 'src/models/User';

import config from 'src/config';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    console.log('create')
    const {
        user,
        value,
        game,
        type
    } = ctx.request.body;
    console.log('create', game)

    //Получаем последнюю транзакцию в этой игре
    const lastTransaction = await Transaction.getLastInGameByGameId(game);

    let ticketFrom = 1;
    let ticketTo = value;

    if (lastTransaction) {
        console.log('Есть последнняя транзакция', lastTransaction.ticketTo, ticketTo, ticketTo + lastTransaction.ticketTo)
        const lastGameTicket = lastTransaction.ticketTo;
        ticketFrom += lastGameTicket;
        ticketTo += lastGameTicket;
    }
    //Получаем последнюю из нее последний билет

    //прибавляем к этому всему нашу ставку

    //сохраняемс.

    console.log('lat create', game)
    const transaction = await Transaction.create({
        user: mongoose.Types.ObjectId(user),
        game: mongoose.Types.ObjectId(game),
        value,
        type,
        ticketFrom,
        ticketTo
    });

    console.log('create', game, transaction)

    switch (transaction.type) {
        case 'GAME_CLASSIC': {
            const game = await Game.findById(transaction.game);
            console.log('find', game);

            game.transactions.push(transaction._id);
            await game.save();
            console.log(game);
            break;
        }

        default: {
            break;
        }
    }
    console.log('user', user, value)
    await User.changeBalance(user, -value);
    console.log('then');
    ctx.body = await Transaction.getById(transaction._id);
};

const getGameBankSumById = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    console.log('id', id);

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

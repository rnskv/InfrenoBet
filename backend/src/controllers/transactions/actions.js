import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transaction from 'src/models/Transaction';
import Game from 'src/models/Game';

import config from 'src/config';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    console.log('try create transaction', ctx.request.body);
    const {
        ownerId,
        value,
        destinationId,
        type
    } = ctx.request.body;


    const transaction = await new Transaction({
        ownerId: mongoose.Types.ObjectId(ownerId),
        value,
        destinationId: mongoose.Types.ObjectId(destinationId),
        type
    }).save();

    console.log(transaction._id);

    if (transaction.type === 'GAME_CLASSIC') {
        const game = await Game.findOne({
            _id: mongoose.Types.ObjectId(transaction.destinationId)
        });

        console.log('lol', game)
        game.transactions.push(transaction._id);

        await game.save();
    }
    //тут пушим траназкцию в игру destinationId если type === 'CLASSIC_GAME';
    ctx.body = transaction

};

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

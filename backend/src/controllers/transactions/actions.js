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
    console.log('create')
    const {
        user,
        value,
        destinationId,
        type
    } = ctx.request.body;


    const transaction = await Transaction.create({
        user: mongoose.Types.ObjectId(user),
        game: mongoose.Types.ObjectId(destinationId),
        value,
        type
    });

    console.log('create', destinationId, transaction)

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
    console.log('send result')
    ctx.body = await Transaction.getById(transaction._id);
};

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

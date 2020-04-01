import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Bet from 'src/models/Bet';
import Game from 'src/models/Game';
import User from 'src/models/User';
import Item from 'src/models/Item';

import config from 'src/config';

import { USER_NOT_ENOUGH_MONEY } from 'src/types/errors';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    console.log('______CREATE_NEW_BET______');
    const {
        user,
        item,
        game,
        type
    } = ctx.request.body;

    const lastBet = await Bet.getLastInGameByGameId(game);
    const itemData = await Item.getById(item);
    const userData = await User.findById(user);

    if (!itemData) {
        ctx.throw('Не верно передан предмет');
    }

    if (itemData.type !== 0) {
        console.log(itemData)

        const result = await User.removeItemsFromInventory(user, [item]);
        if (!result) {
            ctx.throw({ type: 'INTERNAL_SERVER_ERROR' });
            return;
        }
    }

    console.log('Find in bet item with cost:', itemData.cost);

    let ticketFrom = 1;
    let ticketTo = itemData.cost * 10000;

    if (lastBet) {
        const lastGameTicket = lastBet.ticketTo;
        console.log('Fine last game ticket:', lastGameTicket);
        ticketFrom += lastGameTicket;
        ticketTo += lastGameTicket;
    }

    const bet = await Bet.create({
        user: mongoose.Types.ObjectId(user),
        game: mongoose.Types.ObjectId(game),
        item: mongoose.Types.ObjectId(item),
        type,
        ticketFrom,
        ticketTo
    });

    switch (bet.type) {
        case 'GAME_CLASSIC': {
            const game = await Game.findById(bet.game);
            game.bets.push(bet._id);
            await game.save();

            break;
        }

        default: {
            break;
        }
    }
    console.log('New bet created!');
    console.log('__________________________');
    ctx.body = await Bet.getById(bet._id);
};

const getGameBankSumById = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    ctx.body = await Bet.getGameBankSumById(id);
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

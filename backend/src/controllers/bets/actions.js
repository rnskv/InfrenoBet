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
import InventoryItem from '../../models/InventoryItem';
import { INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    console.log('______CREATE_NEW_BET______');
    const {
        user,
        item,
        // game, - @todo remove from all requests
        type
    } = ctx.request.body;

    const lastBet = await Bet.getLastInGameByGameId(game);
    const itemData = await InventoryItem.getById(item);
    const gameData = await Game.getLastCreated();

    if (!gameData) {
        ctx.throw({ type: 'GAME_NOT_FOUND' });
    }

    if (!itemData) {
        ctx.throw('Не верно передан предмет');
    }

    if (itemData.type === 0) {
        try {
            await User.changeBalance(user, -itemData.parent.cost)
        } catch (err) {
            ctx.body = err;
            return;
        }
    }

    if (itemData.type === 1) {
        const result = await User.removeItemsFromInventory(user, [item]);
        if (!result) {
            ctx.throw({ type: 'INTERNAL_SERVER_ERROR' });
            return;
        }
    }

    console.log('Find in bet item with cost:', itemData.parent.cost);

    let ticketFrom = 1;
    let ticketTo = itemData.parent.cost * 10000;

    if (lastBet) {
        const lastGameTicket = lastBet.ticketTo;
        console.log('Fine last game ticket:', lastGameTicket);
        ticketFrom += lastGameTicket;
        ticketTo += lastGameTicket;
    }

    const bet = await Bet.create({
        user: mongoose.Types.ObjectId(user),
        game: gameData._id,
        item: mongoose.Types.ObjectId(item),
        type,
        ticketFrom,
        ticketTo
    });

    switch (bet.type) {
        case 'GAME_CLASSIC': {
            gameData.bets.push(bet._id);
            await gameData.save();

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

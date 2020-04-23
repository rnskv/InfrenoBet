import mongoose from 'mongoose';

import Action from 'src/core/Action';
import passport from 'koa-passport';
import accessMiddleware from 'src/middlewares/check-access';

import Bet from 'src/models/Bet';
import Game from 'src/models/Game';
import User from 'src/models/User';

import InventoryItem from 'src/models/InventoryItem';
import { INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';
import Experience from '../../models/Experience';

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

    const itemData = await InventoryItem.getById(item);
    const gameData = await Game.getLastCreated();
    const lastBet = await Bet.getLastInGameByGameId(gameData._id);

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

    await User.addExperience({
        id: user,
        amount: Math.floor(itemData.parent.cost * 100),
        type: 'GAME_CLASSIC'
    });

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

export const getBankSumById = new Action({
    method: 'post',
    url: '/bank',
    handler: getGameBankSumById
});

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

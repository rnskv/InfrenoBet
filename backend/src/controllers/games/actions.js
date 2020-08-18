import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import accessMiddleware from 'src/middlewares/check-access';

import jwt from 'jsonwebtoken';
import Game from 'src/models/Game';
import User from 'src/models/User';
import Bet from 'src/models/Bet';

import config from 'src/config';
import InventoryItem from 'src/models/InventoryItem';
import { getGameBank, getWinnerInfoFromGame } from 'shared/helpers/game';
import Commission from '../../models/Comission';
import ReferralPayment from '../../models/ReferralPayment';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {
    ctx.body = await Game.getByParams({
        status: 'FINISHED'
    });
};

const getLuckyOfDayHandler = async (ctx) => {
    ctx.body = await Game.getLuckyOfDay();
};

const getGreatestOfDayHandler = async (ctx) => {
    ctx.body = await Game.getGreatestOfDay();
};

const getLastFinishedHandler = async (ctx) => {
    ctx.body = await Game.getLastByParams({
        status: 'FINISHED'
    });
};

const createHandler = async (ctx) => {
    const {
        secret,
        hash
    } = ctx.request.body;

    const existedGame = await Game.getLastCreated();
    if (existedGame) {
        console.log('Игра существует')
        ctx.body = existedGame;
    } else {
        console.log('Игра не существует')

        ctx.body = await Game.create({ secret, hash })
    }
};

const getWinner = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    // const game = await Game.getById(id);
    const winner = await Game.getWinnerById(id);
    const bets = await Bet.getGameBets(id);

    //@todo 0.9 - процент отдаци пользователю (вынести в настройки)

    console.log('Получаем победную игру');
    let globalSum = 0;
    let totalSum = 0;
    let totalGameItems = [];

    for (const bet of bets) {
        const item = bet.item;
        globalSum += item.parent.cost;
        if (item.type === 0) {
            //Монеты
            totalSum += item.parent.cost;
        }

        if (item.type === 1) {
            //Предметы из инвентаря
            totalGameItems.push(item);
        }
    }

    const totalComission = globalSum * 0.1;

    const commissionItems = [];
    let commissionItemsSum = 0;
    let commissionSum = 0;

    let userItems = [];
    let userSum = totalSum;

    if (totalComission < userSum) {
        userSum -= totalComission;
        commissionSum = totalComission;
        userItems = totalGameItems.map(i => i._id);
    } else {
        for (const item of totalGameItems) {
            if (commissionItemsSum < commissionSum && item.cost < commissionSum * 2) {
                commissionSum += item.cost;
                commissionItems.push(item._id);
            } else {
                userItems.push(item._id);
            }
        }
    }

    if (!winner.bet.user.steamId || !winner.bet.user.steamTradeUrl) {

        for (const item of userItems) {
            userSum += (await InventoryItem.getById(item)).parent.cost;
            commissionItems.push(item);
        }

        userItems = [];
    }

    for (const item of commissionItems) {
        console.log('Переводим статус предмета в комиссию');

        await Commission.create({
            type: 1,
            inventoryItem: item,
            game: id
        });

        await InventoryItem.updateById(item, { status: 10 })
    }


    const payment = await ReferralPayment.createForUser({
        user: winner.bet.user._id,
        totalAmount: commissionSum
    });

    if (payment && payment.amount) {
        commissionSum -= payment.amount;
    }

    await Commission.create({
        type: 0,
        amount: commissionSum,
        game: id,
    });

    console.log('Предметы в комиссии', commissionItems);
    console.log('Сумма в комиссии', commissionSum);

    console.log('Предметыользователю', userItems);
    console.log('Сумма пользователю', userSum);

    await User.addItemsToInventory(winner.bet.user._id, userItems);
    await User.changeBalance(winner.bet.user._id, userSum);

    await Game.updateOne({ _id: mongoose.Types.ObjectId(id)}, { $set: {
        winner: winner.bet.user._id,
    }});

    ctx.body = winner;
};

const finishGame = async (ctx) => {
    const {
        id
    } = ctx.request.body;

    const game = await Game.getById(id);
    const winnerInfo = getWinnerInfoFromGame(game);
    const bank = getGameBank(game.bets);

    await Game.updateOne({ _id: mongoose.Types.ObjectId(id)}, { $set: {
        status: 'FINISHED',
        chance: winnerInfo.chance,
        totalBank: bank.total
    }});

    ctx.body = {
        ok: true
    }
};


export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

export const getWinnerById = new Action({
    method: 'post',
    url: '/winner',
    handler: getWinner,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

export const finishById = new Action({
    method: 'post',
    url: '/finish',
    handler: finishGame,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })]
});


export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

export const getLastFinished = new Action({
    method: 'get',
    url: '/last',
    handler: getLastFinishedHandler,
});

export const getLuckyOfDay = new Action({
    method: 'get',
    url: '/lucky',
    handler: getLuckyOfDayHandler,
});

export const getGreatestOfDay = new Action({
    method: 'get',
    url: '/greatest',
    handler: getGreatestOfDayHandler,
});

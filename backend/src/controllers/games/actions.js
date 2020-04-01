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

    // const game = await Game.getById(id);
    const winner = await Game.getWinnerById(id);
    const bank = await Bet.getGameBankSumById(id);

    const bets = await Bet.getGameBets(id);

    //@todo 0.9 - процент отдаци пользователю (вынести в настройки)

    console.log('Получаем победную игру с cтавками', bets);
    let globalSum = 0;
    let totalSum = 0;
    let totalGameItems = [];

    for (const bet of bets) {
        const item = bet.item;
        globalSum += item.cost;
        if (item.type === 0) {
            //Монеты
            totalSum += item.cost;
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

    console.log('Предметы в комиссии', commissionItems);
    console.log('Сумма в комиссии', commissionSum);

    console.log('Предметы пользователю', userItems);
    console.log('Сумма пользователю', userSum);

    await User.addItemsToInventory(winner.bet.user._id, userItems);
    await User.changeBalance(winner.bet.user._id, userSum);

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

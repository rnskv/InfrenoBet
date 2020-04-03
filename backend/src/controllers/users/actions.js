import mongoose from 'mongoose';
import passport from 'koa-passport';
import request from 'request-promise';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from 'src/models/User';
import Item from 'src/models/Item';
import config from '../../config';

import { USER_NOT_FOUND, STEAM_TRADE_URL_MIN_LENGTH, INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';

const changeBalanceHandler = async (ctx) => {
    const { id, amount } = ctx.request.body;

    ctx.body = await User.changeBalance(id, -amount);
};

const getSteamInventoryHandler = async (ctx) => {
    const steamId = ctx.state.user.steamId;
    const gameId = 570;
    console.log('getSteamInventoryHandler');

    if(!steamId) {
        console.log('Игрок не привязал стим, нельзя проверить инвентарь');
        return;
    }

    try {
        const response = await request({
            uri: `http://steamcommunity.com/inventory/76561198839278807/${gameId.toString()}/2?l=english&count=5000`,
            json: true,
        });

        if (response.total_inventory_count === 0) {
            console.log('Инвентарь пустой')
            ctx.throw({ type: INTERNAL_SERVER_ERROR });
            return;
        }

        const userItems = [];
        console.log(response);
        for (const item of response.assets) {
            const { appid, contextid, assetid, classid, instanceid, amount } = item;

            const itemData = await Item.getByClassId(classid);

            if (!itemData) continue;

            userItems.push({
                parent: itemData,
                contextId: contextid,
                assetId: assetid,
                instanceId: instanceid
            })
        }
        ctx.body = userItems;
    } catch(err) {
        console.log('Не удалось получить стоимость инвентаря', err)
        ctx.throw({ type: INTERNAL_SERVER_ERROR })
    }


};

const setSteamTradeUrlHandler = async (ctx) => {
    const { url } = ctx.request.body;
    console.log(url)
    if (url.toString().length < 1) {
        ctx.throw({ type: STEAM_TRADE_URL_MIN_LENGTH })
    }

    ctx.body = await User.update(ctx.state.user._id, {
        steamTradeUrl: url,
    });
};

const getHandler = async (ctx) => {
    const user = await User.findById(mongoose.Types.ObjectId(String(ctx.params._id)));

    if (!user) {
        ctx.throw({ type: USER_NOT_FOUND });
    }

    ctx.body = user
};

const addInventoryHandler = async (ctx) => {
    const { user, items } = ctx.request.body;

    const currentUser = await User.getBySteamId(user.steamId);
    const itemsIds = items.map((item) => item._id);

    console.log(currentUser.inventory);

    const result = await User.addItemsToInventory(currentUser._id, itemsIds);

    if (result) {
        ctx.body = {
            message: 'Вещи в инвентарь были добавлены'
        };
    } else {
        ctx.body = {
            message: 'Вещи не были добавлены в инвентарь'
        }
    }
};

const removeInventoryHandler = async (ctx) => {
    const { userId, itemsIds } = ctx;
    await User.removeItemsFromInventory(userId, itemsIds)
};
const getAllHandler = async (ctx) => {
    ctx.body = 'getAllHandler'
};

const getMeHandler = async (ctx) => {
    console.log(await User.getById(ctx.state.user._id))
    ctx.body = {
        profile: await User.getById(ctx.state.user._id)
    };
};

export const getMe = new Action({
    method: 'get',
    url: '/me',
    middlewares: [passport.authenticate('jwt')],
    handler: getMeHandler,
});

export const get = new Action({
    method: 'get',
    url: '/:id',
    handler: getHandler,
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

export const changeBalance = new Action({
    method: 'put',
    url: '/changeBalance',
    handler: changeBalanceHandler,
});

export const addInventory = new Action({
    method: 'put',
    url: '/inventory',
    handler: addInventoryHandler
});

export const removeInventory = new Action({
    method: 'delete',
    url: '/inventory',
    handler: removeInventoryHandler
});


export const setSteamTradeUrl = new Action({
    method: 'put',
    url: '/steam/url',
    handler: setSteamTradeUrlHandler,
    middlewares: [passport.authenticate('jwt')],
});

export const getSteamInventory = new Action({
    method: 'get',
    url: '/steam/inventory',
    handler: getSteamInventoryHandler,
    middlewares: [passport.authenticate('jwt')],
});

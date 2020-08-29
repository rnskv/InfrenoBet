import mongoose from 'mongoose';
import passport from 'koa-passport';
import request from 'request-promise';

import Action from 'src/core/Action';
import accessMiddleware from 'src/middlewares/check-access';

import jwt from 'jsonwebtoken';
import User from 'src/models/User';
import Item from 'src/models/Item';

import { USER_NOT_FOUND, STEAM_TRADE_URL_MIN_LENGTH, INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';


const cachedInventories = {};
let itemsMap = null;

const changeBalanceHandler = async (ctx) => {
    const { id, amount } = ctx.request.body;

    ctx.body = await User.changeBalance(id, -amount);
};

const getSteamInventoryHandler = async (ctx) => {
    if (!itemsMap) {
        const items = await Item.getAll();

        const map = {};

        items.forEach((value, index) => {
            map[value.classId] = value;
        });

        itemsMap = map;
    }


    const steamId = ctx.state.user.steamId; /*'76561198044161202'*/

    if (cachedInventories[steamId] && cachedInventories[steamId].expires > Date.now()) {
        console.log('Возвращаем данные о инвентаре из кэша');
        ctx.body = cachedInventories[steamId].items;
        return;
    }

    const gameId = 570;

    if(!steamId) {
        console.log('Игрок не привязал стим, нельзя проверить инвентарь');
        return;
    }

    try {
        const response = await request({
            uri: `http://steamcommunity.com/inventory/${steamId.toString()}/${gameId.toString()}/2?l=english&count=5000`,
            json: true,
        });

        if (response.total_inventory_count === 0) {
            console.log('Инвентарь пустой')
            ctx.throw({ type: INTERNAL_SERVER_ERROR });
            return;
        }

        const userItems = [];

        for (const item of response.assets) {
            const { appid, contextid, assetid, classid, instanceid, amount } = item;
            console.log(item);
            const itemData = itemsMap[classid] || { cost: -1 };


            itemData.image = `https://steamcommunity-a.akamaihd.net/economy/image/class/${appid}/${classid}/150fx125f`;

            userItems.push({
                parent: itemData,
                contextId: contextid,
                assetId: assetid,
                instanceId: instanceid
            })
        }

        cachedInventories[steamId] = {
            expires: Date.now() + 60 * 1000,
            items: userItems,
        };

        ctx.body = userItems.sort((a, b) => a.parent.cost < b.parent.cost ? 1 : -1);
    } catch(err) {
        console.log('Не удалось получить стоимость инвентаря', err);
        ctx.throw({ type: INTERNAL_SERVER_ERROR })
    }


};

const setSteamTradeUrlHandler = async (ctx) => {
    const { url } = ctx.request.body;

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

const takeBonusHandler = async (ctx) => {
    const { user } = ctx.state;
    console.log('take bonus handler', user);

    try {
        await User.takeBonus(user._id);

        ctx.body = { ok: true }
    } catch (err) {
        ctx.throw({ type: err })
    }
};

const getAllHandler = async (ctx) => {
    ctx.body = 'getAllHandler'
};

const getMeHandler = async (ctx) => {
    ctx.body = {
        profile: await User.getById(ctx.state.user._id)
    };
};

const receiveAwardHandler = async (ctx) => {
    const { user } = ctx.state;
    const { lvl } = ctx.request.body;

    if (!lvl || !user) {
        ctx.throw(INTERNAL_SERVER_ERROR);
    }

    try {
        await User.addAward({ id: user._id, lvl });
        ctx.body = { ok: true }
    } catch (err) {
        ctx.throw({ type: err })
    }
};

export const getMe = new Action({
    method: 'get',
    url: '/me',
    middlewares: [passport.authenticate('jwt')],
    handler: getMeHandler,
});

export const takeBonus = new Action({
    method: 'get',
    url: '/bonus',
    middlewares: [passport.authenticate('jwt')],
    handler: takeBonusHandler,
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
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

export const addInventory = new Action({
    method: 'put',
    url: '/inventory',
    handler: addInventoryHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

export const removeInventory = new Action({
    method: 'delete',
    url: '/inventory',
    handler: removeInventoryHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
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

export const receiveAward = new Action({
    method: 'post',
    url: '/lvl/award',
    handler: receiveAwardHandler,
    middlewares: [passport.authenticate('jwt')],
});

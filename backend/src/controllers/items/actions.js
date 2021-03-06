import Action from 'src/core/Action';
import passport from 'koa-passport';
import Item from 'src/models/Item';
import InventoryItem from 'src/models/InventoryItem';
import User from 'src/models/User';
import request from 'request-promise';
import { EMPTY_ITEM_COST, FORBIDDEN_TAKE_ITEMS, USER_NOT_REGISTER } from 'shared/configs/notificationsTypes';
import accessMiddleware from 'src/middlewares/check-access';
import TradeOffer from '../../models/TradeOffer';

const dataForMigration = [
    {
        cost: 0.01,
        type: 0,
        image: '/dist/resources/images/1_coin.png',
    },
    {
        cost: 0.05,
        type: 0,
        image: '/dist/resources/images/5_coin.png',
    },
    {
        cost: 0.10,
        type: 0,
        image: '/dist/resources/images/10_coin.png',
    },
    {
        cost: 0.25,
        type: 0,
        image: '/dist/resources/images/25_coin.png',
    },
    {
        cost: 0.50,
        type: 0,
        image: '/dist/resources/images/50_coin.png',
    },
    {
        cost: 1,
        type: 0,
        image: '/dist/resources/images/100_coin.png',
    },
    {
        cost: 2.5,
        type: 0,
        image: '/dist/resources/images/250_coin.png',
    },
    {
        cost: 5,
        type: 0,
        image: '/dist/resources/images/500_coin.png',
    },
    {
        cost: 10,
        type: 0,
        image: '/dist/resources/images/1000_coin.png',
    },
    {
        cost: 25,
        type: 0,
        image: '/dist/resources/images/2500_coin.png',
    },
    {
        cost: 50,
        type: 0,
        image: '/dist/resources/images/5000_coin.png',
    },
    {
        cost: 100,
        type: 0,
        image: '/dist/resources/images/10000_coin.png',
    },
    {
        cost: 500,
        type: 0,
        image: '/dist/resources/images/50000_coin.png',
    },
    {
        cost: 1000,
        type: 0,
        image: '/dist/resources/images/100000_coin.png',
    }
];

const collectComissionHandler = async (ctx) => {
    const { user } = ctx.state;
    const items = await InventoryItem.getAllByParams({ status: 10 });

    for (const item of items) {
        await InventoryItem.updateById(item._id, { status: 20})
    }

    await TradeOffer.create({
        user: user._id,
        items
    });

    ctx.body = {
        ok: true,
    };
};

const getComissionHandler = async (ctx) => {
    const items = await InventoryItem.getAllByParams({ status: 10 });

    ctx.body = items;
};

const validateHandler = async (ctx) => {
    const { steamId, offer } = ctx.request.body;
    const { id, itemsToGive, itemsToReceive } = offer;

    const user = await User.getBySteamId(steamId);

    if (!user) {
        ctx.body = {
            ok: false,
            type: USER_NOT_REGISTER
        };
        return;
    }

    if (itemsToGive.length > 0) {
        ctx.body = {
            ok: false,
            message: FORBIDDEN_TAKE_ITEMS,
            user
        };
        return;
    }
    let isHasCosts = true;

    for (let item of itemsToReceive) {
        const { appid, assetid,  contextid, classid, icon_url_large } = item;

        const itemInfo = await Item.findOne({ classId: classid });

        if (!itemInfo) {
            isHasCosts = isHasCosts && false;
            continue;
        }

        if (!itemInfo.image) {
            itemInfo.image = 'https://steamcommunity-a.akamaihd.net/economy/image/' + icon_url_large;
            itemInfo.save();
        }

        if (!itemInfo.cost) {
            isHasCosts = isHasCosts && false;
        } else {
            isHasCosts = isHasCosts && true;
        }

    }

    if (!isHasCosts) {
        ctx.body = {
            ok: false,
            type: EMPTY_ITEM_COST,
            user
        };
        return;
    }

    ctx.body = { ok: true, user }
};


const registerHandler = async (ctx) => {
    const { items } = ctx.request.body;

    const registeredItems = [];

    for (let item of items) {
        const { assetid,  contextid, classid } = item;

        const itemInfo = await Item.findOne({ classId: classid });

        const inventoryItem = await InventoryItem.create({
            parent: itemInfo._id,
            contextId: contextid,
            assetId: assetid,
            type: 1,
        });

        registeredItems.push(inventoryItem);
    }

    ctx.body = { ok: true, registeredItems }
};

const parseHandler = async (ctx) => {
    const { appId = 570 } = ctx.params;

    const response = await request({
        uri: `http://steamp.ru/v2/?key=${process.env.STEAMP_API_KEY}&appid=${appId}&usd=true&classid=true&bprice=true&bcount=true&count=true`,
        json: true,
    });

    for (let [name, data] of Object.entries(response.items)) {
        const { bcount, price, bprice, count } = data;
        console.log('Check item: ', name);
        if (bcount < 15 || bprice > price * 1.5 || count < 15 ) {
            console.log('Skip item', name);
            continue;
        }

        const itemData = {
            cost: data.price,
            appId: data.appid,
            classId: data.classid,
            type: 1,
        };

        await Item.updateOrCreateByName(name, itemData);
    }

    ctx.body = response;
};

const getAllHandler = async (ctx) => {
    const items = await InventoryItem.find({ type: 0 })

    if (items.length <= 0) {
        console.log('Run migration for collection items');

        for (const data of dataForMigration) {
            console.log(data.cost);
            const item = await Item.create(data);
            await InventoryItem.create({ parent: item._id, type: 0 })
        }


        console.log('Finish migration for collection items');
    }

    ctx.body = await InventoryItem.find({ type: 0 }).populate({
        path: 'parent',
        model: 'item',
    });
};

const postHandler = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        body: 'Hello from action post'
    };
};

export const parse = new Action({
    method: 'post',
    url: '/parse',
    handler: parseHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })]
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

export const add = new Action({
    method: 'post',
    url: '/',
    handler: postHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })]
});

export const validate = new Action({
    method: 'post',
    url: '/validate',
    handler: validateHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })]
});

export const register = new Action({
    method: 'post',
    url: '/register',
    handler: registerHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })]
});

export const collectComission = new Action({
    method: 'post',
    url: '/comission/collect',
    handler: collectComissionHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 100 })]
});

export const getComission = new Action({
    method: 'get',
    url: '/comission',
    handler: getComissionHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 100 })]
});

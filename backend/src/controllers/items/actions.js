import Action from 'src/core/Action';
import passport from 'koa-passport';
import Item from 'src/models/Item';
import User from 'src/models/User';
import request from 'request-promise';

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
    },
    {
        cost: 1337,
        type: 0,
        image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KmsjwPKvBmm5D19V5i_rEprPigVC7vCwwOj6rYOnJI0RpNEbVrAXvlOi8gcDtvZrJziA1vCAqt3-MyRHm0hoYaec-1_3PQF7NVfNIAuDcUWvXnfMD/360fx360f',
    },
    {
        cost: 6666,
        type: 0,
        image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5UM5ZWClcYCUdgU3Z1rQ_FK-xezngZO46MzOziQ1vSMmtCmIyxfkgx5SLrs4SgJFJKs/360fx360f',
    }
];

const validateHandler = async (ctx) => {
    const { steamId, offer } = ctx.request.body;
    const { id, itemsToGive, itemsToReceive } = offer;

    const user = await User.getBySteamId(steamId);

    if (!user) {
        ctx.body = {
            ok: false,
            message: 'Вы не зарегистрированы на нашем сайте'
        };
        return;
    }

    if (itemsToGive.length > 0) {
        ctx.body = {
            ok: false,
            message: 'Вы не можете запрашивать предметы у бота'
        };
        return;
    }
    let isHasCosts = true;
    const items = [];
    console.log(itemsToReceive);
    for (let item of itemsToReceive) {
        const { appid, classid, icon_url_large } = item;

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

        items.push(itemInfo);
    }

    if (!isHasCosts) {
        ctx.body = {
            ok: false,
            message: 'Невозможно определить стоимость одного из предметов'
        };
    }

    console.log('after validate', items);

    ctx.body = { ok: true, items, user }
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
        if (bcount === 0 || bprice > price * 2 || count === 0 ) {
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
    const items = await Item.find({ image: { $exists:true} }).sort({ cost: 1 });

    if (items.length <= 0) {
        console.log('Run migration for collection items');
        for (const data of dataForMigration) {
            await Item.create(data);
        }
        console.log('Finish migration for collection items');
    }

    ctx.body = await Item.find({ image: { $exists: true } }).sort({ cost: 1 });
};

const postHandler = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        body: 'Hello from action post'
    };
};

export const parse = new Action({
    method: 'get',
    url: '/parse',
    handler: parseHandler,
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
});

export const validate = new Action({
    method: 'post',
    url: '/validate',
    handler: validateHandler,
});

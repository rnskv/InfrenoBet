import Action from 'src/core/Action';
import passport from 'koa-passport';
import Item from 'src/models/Item';

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
        cost: 250,
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


const getAllHandler = async (ctx) => {
    const items = await Item.find().sort({ cost: 1 });

    if (items.length <= 0) {
        console.log('Run migration for collection items');
        for (const data of dataForMigration) {
            await Item.create(data);
        }
        console.log('Finish migration for collection items');
    }

    ctx.body = await Item.find().sort({ cost: 1 });
};

const postHandler = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        body: 'Hello from action post'
    };
};

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

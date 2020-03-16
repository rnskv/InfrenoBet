import Action from 'src/core/Action';
import passport from 'koa-passport';
import Item from 'src/models/Item';

const getAllHandler = async (ctx) => {
    const items = await Item.find();

    ctx.body = items;
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

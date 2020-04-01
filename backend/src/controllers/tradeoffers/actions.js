import Action from 'src/core/Action';
import passport from 'koa-passport';
import TradeOffer from 'src/models/TradeOffer';
import User from 'src/models/User';

const getAllHandler = async (ctx) => {
    const { params = { status: 'CREATED' } } = ctx.request.body;
    ctx.body = await TradeOffer.getAll(params)
};

const createHandler = async (ctx) => {
    const { items = [] } = ctx.request.body;

    //если нет юзера - гуляй василий
    //проверить наличие каждого предмета в инвентаре пользователя
    //удалить вещи из инвентаря пользователя
    //создать трейд

    const tradeoffer = await TradeOffer.create({
        user: ctx.state.user._id,
        items
    });

    console.log('Create tradeoffer', tradeoffer);

    ctx.body = tradeoffer;
};

const updateHandler = async (ctx) => {
    const { id, data } = ctx.request.body;
    console.log('update for tradeoffers');
    ctx.body = TradeOffer.update(id, data);
};

export const createWithdrawRequest = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
    middlewares: [passport.authenticate('jwt')],
});

export const updateWithdrowRequest = new Action({
    method: 'put',
    url: '/',
    handler: updateHandler,
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

import Action from 'src/core/Action';
import passport from 'koa-passport';
import TradeOffer from 'src/models/TradeOffer';
import User from 'src/models/User';

const getAllHandler = async (ctx) => {
    const { params = { status: 'CREATED' } } = ctx.request.body;
    ctx.body = await TradeOffer.getAll(params)
};

const createHandler = async (ctx) => {
    const { userId = '5e83af19357eee90f61eca76', items = []} = ctx.request.body;
    const user = await User.findById(userId);

    const tradeoffer = await TradeOffer.create({
        user: user._id,
        items: [
            '5e83aef1fe76f2175b15e37a',
            '5e83af52a6aff7176d78aadf',
            '5e83af4ba6aff7176d78aa8b',
            '5e83af89a6aff7176d78ae06',
        ]
    });

    console.log('Create tradeoffer', tradeoffer);

    ctx.body = tradeoffer;
};

const updateHandler = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        body: 'Обновляю заявку на вывод'
    };
};

export const createWithdrawRequest = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

export const updateWithdrowRequest = new Action({
    method: 'put',
    url: '/:id',
    handler: updateHandler,
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

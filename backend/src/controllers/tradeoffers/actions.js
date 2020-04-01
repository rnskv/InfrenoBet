import Action from 'src/core/Action';
import passport from 'koa-passport';
import TradeOffer from 'src/models/TradeOffer';
import User from 'src/models/User';

const getAllHandler = async (ctx) => {
    const { params = { status: 'CREATED' } } = ctx.request.body;
    ctx.body = await TradeOffer.getAll(params)
};

const createHandler = async (ctx) => {
    const { userId = '5e84ef0af3dd5358c725ed39', items = []} = ctx.request.body;
    const user = await User.findById(userId);
    //если нет юзера - гуляй василий
    //проверить наличие каждого предмета в инвентаре пользователя
    //удалить вещи из инвентаря пользователя
    //создать трейд
    const tradeoffer = await TradeOffer.create({
        user: user._id,
        items: [
            '5e84fde75a126e5c7695285f',
            '5e84fde75a126e5c7695285e',
            '5e84fde75a126e5c76952860',
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

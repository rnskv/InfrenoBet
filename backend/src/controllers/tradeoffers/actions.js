import Action from 'src/core/Action';
import passport from 'koa-passport';
import TradeOffer from 'src/models/TradeOffer';
import User from 'src/models/User';
import * as notificationsTypes from 'shared/configs/notificationsTypes';
import accessMiddleware from 'src/middlewares/check-access';

const getAllHandler = async (ctx) => {
    const { params = { status: 'CREATED' } } = ctx.request.body;
    ctx.body = await TradeOffer.getAll(params)
};

const createHandler = async (ctx) => {
    const { items = [] } = ctx.request.body;
    const userId = ctx.state.user._id;
    //если нет юзера - гуляй василий
    const itemsIds = items.map(item => item._id);
    //проверить наличие каждого предмета в инвентаре пользователя
    if (!(await User.checkUserInventoryItems(userId, itemsIds))) {
        ctx.throw({ type: notificationsTypes.USER_HAS_NOT_ITEMS });
        return;
    }

    await User.removeItemsFromInventory(userId, itemsIds);
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
    const { id, data, isNeedReturnItems = false } = ctx.request.body;
    const trade = await TradeOffer.getById(id);
    console.log('Обновляю трейд', id);

    if (isNeedReturnItems) {
        console.log('Нужно вернуть вещи');
        try {
            const itemsIds = trade.items.map(_item => _item._id);
            console.log('Возвращаю вещи', itemsIds);

            await User.addItemsToInventory(trade.user, itemsIds);
        } catch (e) {
            ctx.throw({ type: notificationsTypes.INTERNAL_SERVER_ERROR })
        }
    }

    ctx.body = await TradeOffer.update(id, data);
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
    middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 50 })],
});

export const getAll = new Action({
    method: 'get',
    url: '/',
    handler: getAllHandler,
});

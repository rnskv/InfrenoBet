import passport from 'koa-passport';
import Action from 'src/core/Action';
import SwiftPay from 'swiftpay';
import Withdraw from 'src/models/Withdraw';
import User from 'src/models/User';
import { exchange } from 'shared/configs/money';
import accessMiddleware from 'src/middlewares/check-access';

const { SWIFT_PAYMENT_API_KEY } = process.env;

const swift =  new SwiftPay(SWIFT_PAYMENT_API_KEY);
const SWIFT_SYSTEMS = {
    QIWI: 1,
};

const createSwiftPayout = ({ amount, wallet }) => {
    return new Promise((resolve, reject) => {
        swift.createPayout({
            system_id: SWIFT_SYSTEMS.QIWI, // id системы
            amount: amount * 0.9 / exchange.RUB, // сумма вывода
            wallet, // кошелек для вывода
        }, function(err, response, body){
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(response);
                resolve(response)
            }
        });
    })
}

const createPayoutHandler = async (ctx) => {
    console.log('Создаю выпалту');
    const {
        _id,
        user,
        amount,
        destination
    } = ctx.request.body;

    const withdraw = await Withdraw.getById(_id);
    console.log(withdraw)
    if (withdraw.status !== 'CREATED') {
        console.log('Множественная выплата');
        ctx.throw({ type: 'INTERNAL_SERVER_ERROR' })
    }
    console.log(`Создаём выплату пользователю ${user._id}`);

    try {
        await User.changeBalance(user._id, -amount);
        await Withdraw.updateById(_id, { status: 'SUCCESS'});
        console.log(`Баланс пользователя  ${user} изменен на сумму вывода ${amount}`);

        const payout = await createSwiftPayout({ amount, wallet: destination });

        if (payout.error === 0) {
            ctx.body = { ok: true };
        } else {
            ctx.body = { ok: false };
        }
    } catch (err) {
        console.log('Не удалось создать выплату', err);
        await Withdraw.updateById(_id, { status: 'ERROR'});
        await User.changeBalance(user._id, amount);

        ctx.throw({ type: err.type })
    }

    ctx.body = 'ok';
};


export const createPayout = new Action({
    method: 'post',
    url: '/swift/payout',
    handler: createPayoutHandler,
    middlewares: [passport.authenticate('jwt'), accessMiddleware(100)]
});

import Action from 'src/core/Action';
import passport from 'koa-passport';
import moment from 'moment';
import Deposit from '../../models/Deposit';
import Commission from '../../models/Comission';
import Withdraw from '../../models/Withdraw';
import ReferralPayment from '../../models/ReferralPayment';

const getAllHandler = async (ctx) => {
    console.log('hello', ctx.request.query);
    const { query } = ctx.request;

    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    console.log(startDate, endDate);

    const defaultValue = { amount: 0 };

    const totalDeposits = await Deposit.getTotalSum(startDate, endDate) || defaultValue;
    const totalComission = await Commission.getTotalSum(startDate, endDate) || defaultValue;
    const totalWithdraws = await Withdraw.getTotalSum(startDate, endDate) || defaultValue;
    const totalRevShare = await ReferralPayment.getTotalSum(startDate, endDate) || defaultValue;

    console.log(totalDeposits, totalComission, totalWithdraws, totalRevShare);

    const NGR = (totalComission.amount - totalRevShare.amount) * 0.9;


    //TOTAL COMISSIONS
    //TOTAL DEPOSITS
    //TOTAL WITHDRAWS
    //TOTAL REVSHARE

    //NGR = TOTALDEPOSITS - WITHDRAWS - REVSHARE - COMISSIONS
    ctx.body = {
        totalComission: totalComission.amount,
        totalDeposits: totalDeposits.amount,
        totalRevShare: totalRevShare.amount,
        totalWithdraws: totalWithdraws.amount,
        NGR,
    };
};

export const all = new Action({
    method: 'get',
    url: '/all',
    // middlewares: [passport.authenticate('jwt')],
    handler: getAllHandler,
});

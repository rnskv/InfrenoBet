import Action from 'src/core/Action';
import User from 'src/models/User';
import Referral from 'src/models/Referral';
import passport from 'koa-passport';
import ReferralPayment from '../../models/ReferralPayment';

async function connectWithPartner({ referralCode, user }) {
    if (referralCode) {
        const partner = await User.getByParams({ referralCode });

        if (partner) {
            console.log('Id партнера', partner._id);
            if (String(partner._id) === String(user._id)) {
                console.log('Нельзя использовать свйо же код');
                return;
            }

            const r = await Referral.create({
                partner: partner._id,
                user: user._id
            });

            if (r.ok === false) {
                console.log('Пользователь уже является рефералом');
            }
        } else {
            console.log('Пользователь регистрируется с кодом несуществующего партнера', referralCode);
        }
    }
}

const createCodeHandler = async (ctx) => {
  console.log('Создаем код', ctx.request.body);
  const { user } = ctx.state;
  const { code } = ctx.request.body;

  const result = await Referral.createCodeForUser(user._id, { code });
  if (result.isError) {
      ctx.throw({ type: result.type });
  }

  ctx.body = {
      ok: true
  }
};

const connectHandler = async (ctx) => {
    const { user } = ctx.state;
    const { cookies = {} } = ctx.request.body;
    const { referralCode } = cookies;

    await connectWithPartner({ referralCode, user });

    ctx.body = {
        ok: true,
    }
};

const getMyStatisticHandler = async (ctx) => {
    const userId = ctx.state.user._id;

    const user = await User.getById(userId);
    const referrals = await Referral.getByPartnerId(user._id, { limit: 3 });
    const users = referrals.body.map(referral => referral.user);
    const amount = await ReferralPayment.getPartnerAmountById(user._id);

    ctx.body = {
       totalCount: referrals.data.totalCount,
       amount,
       users,
    }
};


const connectCodeHandler = async (ctx) => {

};

const cashOutHandler = async (ctx) => {
    const { user } = ctx.state;
    const result =  await ReferralPayment.cashOutToUserBalanceById(user._id);
    if (result.isError) {
        ctx.throw({ type: result.type });
        return;
    }

    ctx.body = {
        ok: true
    }
};

export const connect = new Action({
    method: 'post',
    url: '/connect',
    handler: connectHandler,
    middlewares: [passport.authenticate('jwt')],
});

export const getMyStatistic = new Action({
    method: 'get',
    url: '/my',
    handler: getMyStatisticHandler,
    middlewares: [passport.authenticate('jwt')],
});

export const connectByCode = new Action({
    method: 'post',
    url: '/connect/code',
    handler: connectCodeHandler,
    middlewares: [passport.authenticate('jwt')],
});

export const cashOut = new Action({
    method: 'post',
    url: '/cashout',
    handler: cashOutHandler,
    middlewares: [passport.authenticate('jwt')],
});


export const createCode = new Action({
    method: 'post',
    url: '/code',
    handler: createCodeHandler,
    middlewares: [passport.authenticate('jwt')],
});


import mongoose from 'mongoose';
import Referral from './Referral';
import User from './User';

import { INTERNAL_SERVER_ERROR, REFERRAL_CODE_ALREADY_EXIST } from 'shared/configs/notificationsTypes';

const { Schema } = mongoose;

const referralPaymentSchema = new Schema({
    partner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 0, //0 - на ожидает вывода, 1 - пользователь забрал
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    },
});

const ReferralPayment = mongoose.model('referralPayment', referralPaymentSchema);

ReferralPayment.create = async (data) => {
    return new ReferralPayment(data).save()
};

ReferralPayment.updateById = async (id, data) => {
    return await ReferralPayment.update({ _id: mongoose.Types.ObjectId(id) }, data)
};

ReferralPayment.getByParams = async (params) => {
    return await ReferralPayment.find(params)
        .populate('inventoryItem')
        .populate('game');
};

ReferralPayment.createForUser = async ({ user, totalAmount }) => {
    const partner = await Referral.getUserPartnerById(user);

    if (!partner) return null;

    return await ReferralPayment.create({
        user: user,
        partner: partner._id,
        amount: totalAmount * partner.referralShare
    });
};

ReferralPayment.cashOutToUserBalanceById = async (id) => {
    const amount = await ReferralPayment.getPartnerAmountById(id);

    if (!amount) {
        //@todo Нормальную ошибку
        return {
            ok: false,
            type: INTERNAL_SERVER_ERROR
        }
    }

    await User.changeBalance(id, amount);

    return await ReferralPayment.update({
        partner:  mongoose.Types.ObjectId(id),
        status: 0,
    }, { status: 1 });
};

ReferralPayment.getPartnerAmountById = async (id) => {
    const data = await ReferralPayment.aggregate([
        {
            $match: {
                partner: { $eq: mongoose.Types.ObjectId(id) },
                status: { $eq: 0 }
            }
        },
        {
            $group: {
                _id: null,
                amount: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    if (!data[0]) return 0;

    return data[0].amount;
};

export default ReferralPayment;

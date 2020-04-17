
import mongoose from 'mongoose';
import User from './User';
import { REFERRAL_CODE_ALREADY_EXIST } from 'shared/configs/notificationsTypes';

const { Schema } = mongoose;

const referralSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    partner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    },
});

const Referral = mongoose.model('referral', referralSchema);

Referral.create = async (data) => {
    const alreadyReferer = await Referral.checkUser(data.user._id);
    if (alreadyReferer) {
        return {
            isError: true
        };
    }
    return new Referral(data).save()
};

Referral.checkUser = async (id) => {
    console.log('check', await Referral.findOne({ user: mongoose.Types.ObjectId(id)}));
    return Boolean(await Referral.findOne({ user: mongoose.Types.ObjectId(id)}))
};

Referral.updateById = async (data) => {

};

Referral.getByParams = async (params) => {
    return await Referral.find(params)
        .populate('user')
        .populate('partner');
};

Referral.getByPartnerId = async (id, filter) => {
    return {
        body: await Referral.find({ partner: mongoose.Types.ObjectId(id)})
            .sort({ createDate: -1 })
            .limit(filter.limit)
            .populate('user')
            .populate('partner'),
        data: {
            totalCount: (await Referral.find({ partner: mongoose.Types.ObjectId(id)})).length
        }
    }
};

Referral.getUserPartnerById = async (id) => {
    const referral = await Referral.findOne({ user: mongoose.Types.ObjectId(id)})
        .populate('user')
        .populate('partner');
    if (!referral) return referral;
    return referral.partner;
};

Referral.createCodeForUser = async (id, { code }) => {
    const isExist = await User.findOne({ referralCode: code });
    console.log('Ищу с кодом', code, isExist)
    if (isExist) {
        return {
            isError: true,
            type: REFERRAL_CODE_ALREADY_EXIST
        }
    }

    return await User.update(id, {
        referralCode: code
    });
};

export default Referral;

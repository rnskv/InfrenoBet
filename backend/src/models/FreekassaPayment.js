import mongoose from 'mongoose';

const { Schema } = mongoose;

const freekassaPaymentSchema = new Schema({
    MERCHANT_ID: {
        type: Number,
    },
    AMOUNT: {
        type: Number,
    },
    intid: {
        type: Number,
    },
    MERCHANT_ORDER_ID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    P_EMAIL: {
        type: String,
    },
    P_PHONE: {
        type: String,
    },
    CUR_ID: {
        type: Number,
    },
    SIGN: {
        type: String,
    },
    us_key: {
        type: String,
    },
    STATUS: {
        type: String,
        default: 'SUCCESS',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

const fkPayment = mongoose.model('fkPayment', freekassaPaymentSchema);

fkPayment.create = async (data) => {
    return new fkPayment(data).save()
};

fkPayment.getAll = async (id) => {
    return await fkPayment.find()
        .select({ MERCHANT_ORDER_ID: 1, AMOUNT: 1, intid: 1, createDate: 1, STATUS: 1 })
        .sort({ createDate: -1 })
        .populate('MERCHANT_ORDER_ID')
};

fkPayment.getByUserId = async (id) => {
    return await fkPayment
        .findOne({ MERCHANT_ORDER_ID: mongoose.Types.ObjectId(id)})
        .select({ MERCHANT_ORDER_ID: 1, AMOUNT: 1, intid: 1, createDate: 1, STATUS: 1 })
        .sort({ createDate: -1 })
        .populate('MERCHANT_ORDER_ID')
};

export default fkPayment

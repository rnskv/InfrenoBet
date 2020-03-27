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
    }
});

const fkPayment = mongoose.model('fkPayment', freekassaPaymentSchema);

fkPayment.create = async (data) => {
    return new Item(data).save()
};

fkPayment.getByUserId = async (id) => {
    return await fkPayment
        .findOne({ MERCHANT_ORDER_ID: mongoose.Types.ObjectId(id)})
        .populate('MERCHANT_ORDER_ID')
};

export default fkPayment

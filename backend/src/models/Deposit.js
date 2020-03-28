import mongoose from 'mongoose';

const { Schema } = mongoose;

const depositSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    amount: {
        type: Number,
    },
    system: {
        type: String,
    },
    status: {
        type: String,
        default: 'SUCCESS',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

const Deposit = mongoose.model('deposit', depositSchema);

Deposit.create = async (data) => {
    return new Deposit(data).save()
};

Deposit.update = async (id, data) => {
    // return new fkPayment(data).save()
};

Deposit.getAll = async () => {
    return await Deposit.find()
        .sort({ createDate: -1 })
        .populate('user')
};

Deposit.getByUserId = async (id) => {
    return await Deposit.findOne({ user: mongoose.Types.ObjectId(id)})
        .sort({ createDate: -1 })
        .populate('user')
};

export default Deposit

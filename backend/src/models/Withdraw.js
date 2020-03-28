import mongoose from 'mongoose';

const { Schema } = mongoose;

const withdrawSchema = new Schema({
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
        default: 'CREATED',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

const Withdraw = mongoose.model('withdraw', withdrawSchema);

Withdraw.create = async (data) => {
    return new Withdraw(data).save()
};

Withdraw.update = async (id, data) => {
    // return new fkPayment(data).save()
};

Withdraw.getAll = async () => {
    return await Withdraw.find()
        .sort({ createDate: -1 })
        .populate('user')
};

Withdraw.getByUserId = async (id) => {
    return await Withdraw.find({ user: mongoose.Types.ObjectId(id)})
        .sort({ createDate: -1 })
        .populate('user') || []
};

export default Deposit

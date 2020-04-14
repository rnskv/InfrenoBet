import mongoose from 'mongoose';

const { Schema } = mongoose;

const withdrawSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        isRequired: true,
    },
    destination: {
        type: String,
        isRequired: true,
    },
    amount: {
        type: Number,
        isRequired: true,
    },
    system: {
        type: String,
        isRequired: true,
    },
    status: {
        type: String,
        default: 'CREATED',
    },
    createDate: {
        type: Date,
        default: new Date(),
    },
});

const Withdraw = mongoose.model('withdraw', withdrawSchema);

Withdraw.create = async (data) => {
    return new Withdraw(data).save()
};

Withdraw.updateById = async (id, data) => {
    return await Withdraw.update({ _id: mongoose.Types.ObjectId(id)}, data);
};

Withdraw.getById = async (id) => {
    return await Withdraw.findOne({ _id: mongoose.Types.ObjectId(id)});
};

Withdraw.getAll = async () => {
    return await Withdraw.find()
        .sort({ createDate: -1 })
        .populate('user')
};

Withdraw.getByParams = async (params) => {
    return await Withdraw.find(params)
        .sort({ createDate: -1 })
        .populate('user')
};

Withdraw.getByUserId = async (id) => {
    return await Withdraw.find({ user: mongoose.Types.ObjectId(id)})
        .sort({ createDate: -1 })
        .populate('user') || []
};

export default Withdraw

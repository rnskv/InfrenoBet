import mongoose from 'mongoose';
import Commission from './Comission';

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
        default: () => Date.now(),
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

Withdraw.getByParams = async (params, { limit, offset }) => {
    return await Withdraw.find(params)
        .sort({ createDate: -1 })
        .limit(limit)
        .skip(offset)
        .populate('user')
};

Withdraw.getByUserId = async (id) => {
    return await Withdraw.find({ user: mongoose.Types.ObjectId(id)})
        .sort({ createDate: -1 })
        .populate('user') || []
};

Withdraw.getTotalSum = async (startDate, endDate) => {
    return (await Withdraw.aggregate([
        {
            $match : {
                createDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
        },
        {
            $group: {
                _id: null,
                amount: {
                    $sum: "$amount"
                }
            }
        }
    ]))[0]
};

export default Withdraw

import mongoose from 'mongoose';

const { Schema } = mongoose;

const awardSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
    },
    source: {
        type: String,
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    },
});

const Award = mongoose.model('award', awardSchema);

Award.create = async (data) => {
    return new Award(data).save()
};

Award.updateById = async (data) => {

};

Award.getByParams = async (params) => {
    return await Award.find(params)
};

Award.getTotalSum = async (startDate, endDate) => {
    return (await Award.aggregate([
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

export default Award;

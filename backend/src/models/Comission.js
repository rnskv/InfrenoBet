
import mongoose from 'mongoose';

const { Schema } = mongoose;

const commissionSchema = new Schema({
    type: {
        type: Number, //0 - money; 1 - item
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    inventoryItem: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'inventoryItem'
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'game',
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

const Commission = mongoose.model('comission', commissionSchema);

Commission.create = async (data) => {
    return new Commission(data).save()
};

Commission.updateById = async (data) => {

};

Commission.getByParams = async (params) => {
    return await Commission.find(params)
        .populate('inventoryItem')
        .populate('game');
};

export default Commission;

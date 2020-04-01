import mongoose from 'mongoose';

const { Schema } = mongoose;

const tradeOfferSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        isRequired: true,
    },
    items: {
        type: [mongoose.Types.ObjectId],
        ref: 'inventoryItem',
        isRequired: true,
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

const TradeOffer = mongoose.model('tradeoffer', tradeOfferSchema);

TradeOffer.create = async (data) => {
    return new TradeOffer(data).save()
};

TradeOffer.update = async (id, data) => {
    // return new fkPayment(data).save()
};

TradeOffer.getAll = async (params = {}) => {
    return await TradeOffer.find(params)
        .sort({ createDate: -1 })
        .populate('user')
        .populate({
            path: 'items',
            model: 'inventoryItem',
            populate: {
                path: 'parent',
                model: 'item',
            }
        })
};

TradeOffer.getByUserId = async (id) => {
    return await Withdraw.find({ user: mongoose.Types.ObjectId(id)})
        .sort({ createDate: -1 })
        .populate({
            path: 'user',
            model: 'user'
        })
        .populate({
            path: 'inventory',
            model: 'inventoryItem',
            populate: {
                path: 'parent',
                model: 'item',
            }
        })

};

export default TradeOffer

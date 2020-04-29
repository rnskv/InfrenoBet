import mongoose from 'mongoose';
import User from './User';

const { Schema } = mongoose;

const inventoryItemSchema = new Schema({
    parent: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        ref: 'item'
    },
    type: {
        type: Number,
    },
    assetId: {
        type: Number,
    },
    contextId: {
        type: Number,
    },
    status: {
        type: Number,
        default: 0, //0 - у пользователя, 10 - в комиссии //20 - выведен
    }
});

const InventoryItem = mongoose.model('inventoryItem', inventoryItemSchema);

InventoryItem.updateOrCreateByName = (name, data) => {
    return InventoryItem.update({
            name: name
        }, data, {
            upsert: true,
            setDefaultsOnInsert: true
        },
    );
};

InventoryItem.create = async (data) => {
    return new InventoryItem(data).save()
};

InventoryItem.getAllByParams = async (params) => {
    return await InventoryItem.find(params).populate('parent');
};


InventoryItem.updateById = async (id, data) => {
    return await InventoryItem.updateOne({ _id: mongoose.Types.ObjectId(id)}, { $set: data });
};

InventoryItem.getById = async (id) => {
    return await InventoryItem.findOne({ _id: mongoose.Types.ObjectId(id)}).populate('parent')
};

export default InventoryItem

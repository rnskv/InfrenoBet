import mongoose from 'mongoose';

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

InventoryItem.getById = async (id) => {
    return await InventoryItem.findOne({ _id: mongoose.Types.ObjectId(id)}).populate('parent')
};

export default InventoryItem

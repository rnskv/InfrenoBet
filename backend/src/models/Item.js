import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema({
    type: {
        type: Number, //0 - currency, 1 - csgo
    },
    appId: {
        type: Number,
        default: 0,
    },
    classId: {
        type: Number,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        isRequired: true,
    },
    cost: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    }
});

// itemSchema.index({name: 1});

const Item = mongoose.model('item', itemSchema);

Item.updateOrCreateByName = (name, data) => {
    return Item.update({
            name: name
        }, data, {
            upsert: true,
            setDefaultsOnInsert: true
        },
    );
};

Item.create = async (data) => {
    return new Item(data).save()
};

Item.getByClassId = async (classId) => {
    return await Item.findOne({ classId })
};

Item.getById = async (id) => {
    return await Item
        .findOne({ _id: mongoose.Types.ObjectId(id)})
};

export default Item

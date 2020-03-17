import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema({
    type: {
      type: Number, //0 - currency, 1 - csgo
    },
    cost: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    }
});

const Item = mongoose.model('item', itemSchema);

Item.create = async (data) => {
    return new Item(data).save()
};

Item.getById = async (id) => {
    return await Item
        .findOne({ _id: mongoose.Types.ObjectId(id)})
};

export default Item

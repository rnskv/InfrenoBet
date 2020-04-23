
import mongoose from 'mongoose';
import User from './User';

const { Schema } = mongoose;

const experienceSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
    },
    type: {
        type: String,
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    },
});

const Experience = mongoose.model('experience', experienceSchema);

Experience.create = async (data) => {
    return new Experience(data).save()
};

Experience.updateById = async (data) => {

};

Experience.getByParams = async (params) => {
    return await Experience.find(params)
};

export default Experience;

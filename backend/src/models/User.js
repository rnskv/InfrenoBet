import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Transaction from './Transaction';

const { Schema } = mongoose;
import { USER_NOT_ENOUGH_MONEY, USER_NOT_FOUND } from 'src/types/errors';

const userSchema = new Schema({
    login: {
        type: String,
        default: 'Player Unknown',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://sun9-37.userapi.com/c830400/v830400985/c0fdb/9CIryApwPMY.jpg?ava=1'
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.plugin(privatePaths);

const User = mongoose.model('user', userSchema);

User.getById = async (id) => {
    return await User.findOne({ _id: mongoose.Types.ObjectId(id)})
};

User.changeBalance = async (id, amount) => {
    const user = await User.getById(id);

    if (!user) {
        throw USER_NOT_FOUND;
    }

    if (user.balance + amount < 0) {
        throw USER_NOT_ENOUGH_MONEY;
    }

    user.balance = user.balance + amount;
    user.save();

    return user
};


export default User;

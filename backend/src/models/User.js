import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';

const { Schema } = mongoose;

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
    password: {
        type: String,
        required: true,
        private: true,
    },
    balance: {
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

export default mongoose.model('user', userSchema);

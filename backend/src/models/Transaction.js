import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        ref: 'user'
    },
    destinationId: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        ref: 'game'
    },
    type: { //GAME_CLASSIC, USER_TRANSFER
        type: String,
        isRequired: true
    },
    value: {
        type: Number,
        isRequired: true
    },
    createDate: {
        type: Date,
        default: Date.now(),
    }
});

export default mongoose.model('transaction', transactionSchema);

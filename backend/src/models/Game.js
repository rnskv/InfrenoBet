import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';

const { Schema } = mongoose;

const gameSchema = new Schema({
    users: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    transactions: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'Transaction'
    },
    secret: {
        type: Number,
        isRequired: true
    },
    hash: {
        type: String,
        isRequired: true
    },
    status: {
        type: String,
        default: 'CREATED' //IN_PROCCESS, GET_WINNER, FINISHED
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model('game', gameSchema);

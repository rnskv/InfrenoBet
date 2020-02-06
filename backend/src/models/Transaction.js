import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Game from './Game';

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        ref: 'user'
    },
    game: {
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
    ticketFrom: {
        type: Number,
        isRequired: true
    },
    ticketTo: {
        type: Number,
        isRequired: true
    },
    createDate: {
        type: Date,
        default: Date.now(),
    }
});
const Transaction = mongoose.model('transaction', transactionSchema);

Transaction.create = async (data) => {
    console.log('create with data', data)
    return new Transaction(data).save()
};

Transaction.getById = async (id) => {
    return await Transaction
        .findOne({ _id: mongoose.Types.ObjectId(id)})
        .populate('user');
};

Transaction.getLastInGameByGameId = async (gameId) => {
    console.log('getLastInGameByGameId', gameId)

    const lastTransaction = await Transaction
        .findOne({ game: mongoose.Types.ObjectId(gameId) }, {}, { sort: { _id: -1 }});

    return lastTransaction
};

export default Transaction

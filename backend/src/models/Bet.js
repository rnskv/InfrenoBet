import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Game from './Game';

const { Schema } = mongoose;

const betSchema = new Schema({
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
    item: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        ref: 'item'
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
const Bet = mongoose.model('bet', betSchema);

Bet.create = async (data) => {
    console.log('New bet creating...')
    return new Bet(data).save()
};

Bet.getById = async (id) => {
    return await Bet
        .findOne({ _id: mongoose.Types.ObjectId(id)})
        .populate('user')
        .populate('item')
};

Bet.getLastInGameByGameId = async (gameId) => {
    const lastBet = await Bet
        .findOne({ game: mongoose.Types.ObjectId(gameId) }, {}, { sort: { _id: -1 }});

    return lastBet
};

Bet.getGameBankSumById = async (gameId) => {
      return (await Bet.aggregate([
        {
            $match: { game: mongoose.Types.ObjectId(gameId) }
        },
        {
            $group: {
                _id: '$game',
                sum: { $sum: '$value' }
            }
        }
    ]))[0]
};

export default Bet
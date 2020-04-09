import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Bet from 'src/models/Bet';
import User from './User';

const { Schema } = mongoose;

const gameSchema = new Schema({
    bets: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'bet'
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
    winner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

const Game = mongoose.model('game', gameSchema);

Game.getByParams = async (params = {}) => {
    return await Game.find(params)
        .populate({
            path: 'bets',
            model: 'bet',
            populate: [{
                path: 'item',
                model: 'inventoryItem',
                populate: {
                    path: 'parent',
                    model: 'item',
                }
            }, 'user'],
        })
        .populate({
            path: 'winner',
            model: 'user',
        })
        .sort({ createDate: -1})
        .limit(50)
};

Game.getLastCreated = async () => {
    return Game.findOne({ status: 'CREATED' })
        .populate({
            path: 'bets',
            model: 'bet',
            populate: [{
                path: 'item',
                model: 'inventoryItem',
                populate: {
                    path: 'parent',
                    model: 'item',
                }
            }, 'user'],
        })
};

Game.create = async (data) => {
    return new Game(data).save()
};

Game.findById = async (id) => {
    return await Game.findOne({
        _id: mongoose.Types.ObjectId(id)
    });
};

Game.update = async (data) => {
    return await Game.update()
};

Game.getWinnerById = async (id) => {
    const game = await Game.findById(id);
    const lastGameBet = await Bet.getLastInGameByGameId(id);

    const ticketsCount = lastGameBet.ticketTo;

    const secret = game.secret;
    const winnerTicket = Math.floor(secret * ticketsCount) + 1;

    console.log('Получаем победную ставку с билетом', winnerTicket);

    const winnerBet = await Bet.findOne({
        game: mongoose.Types.ObjectId(id),
        ticketFrom: { $lte: winnerTicket },
        ticketTo: { $gte: winnerTicket }
    }).populate('user').populate({
        path: 'item',
        model: 'inventoryItem',
        populate: {
            path: 'parent',
            model: 'item',
        }
    });

    console.log('Получили победную ставку', winnerBet);

    winnerBet.winnerTicket = winnerTicket;
    return {
        bet: winnerBet,
        ticket: winnerTicket
    };
    //Получаем игру
    //Получаем все транзакции из игры
    //Считаем количество билетов в игре (получаем последнюю транзакцию и берем tickerTo);
    //Берем secret из Game
    //Умножаем secret на кол-во билетов
    //Фильтруем 1 траназкцию где победное число > tickerFrom и меньше tickerTo. Возвращаем победную транзакцию.
};

export default Game;

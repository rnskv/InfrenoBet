import mongoose from 'mongoose';
import moment from 'moment';
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
    totalBank: {
        type: Number,
        default: 0,
    },
    chance: {
        type: Number,
        default: 0,
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    },
});

const Game = mongoose.model('game', gameSchema);

Game.getTopPlayersOfWeek = async () => {
    //Получить все игры за последнюю неделю
    //Получить мапу где ключ - id победителя а значение - сумма выиграных денег за эту неделю.
    //Сделать сортировка по значению
    //Взять первые 10 значений
    const today = moment().startOf('day');

    const startOfWeek = moment(today).startOf('week');
    const endOfWeek = moment(today).endOf('week');

    const aggregation = Game.aggregate([
        {
            $match: {
                status: 'FINISHED',
                createDate: {
                    $gte: startOfWeek.toDate(),
                    $lte: endOfWeek.toDate()
                }
            },
        },
        {
            $group: {
                _id: '$winner',
                totalWin: {
                    $sum: '$totalBank'
                }
            },
        },
        {
            $sort: {
                totalWin: -1,
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                totalWin: 1,
                'user.login': 1,
                'user.name': 1,
                'user.avatar': 1,
            }
        },
        {
            $unwind: {
                path: '$user'
            }
        }
    ])

    return aggregation
}

Game.getLuckyOfDay = async () => {
    const today = moment().startOf('day');
    const winner = await Game.find({
        status: 'FINISHED',
        chance: {
            $gt: 0,
        },
        createDate: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    })
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
        .sort({ chance: 1 })
        .limit(1);

    return winner[0];
};

Game.getGreatestOfDay = async () => {
    const today = moment().startOf('day');

    const winner = await Game.find({
        status: 'FINISHED',
        chance: {
            $gt: 0,
        },
        createDate: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    })
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
        .sort({ totalBank: -1 })
        .limit(1);

    return winner[0];
};


Game.getById = async (id) => {
    return (await Game.getByParams({
        _id:  mongoose.Types.ObjectId(id)
    }))[0]
};

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
        .sort({ _id: -1})
        .limit(50)
};

Game.getLastByParams = async (params = {}) => {
    return await Game.findOne(params)
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
        .sort({ _id: -1})
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

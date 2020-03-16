import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Bet from 'src/models/Bet';

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
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

const Game = mongoose.model('game', gameSchema);

Game.getLastCreated = async () => {
    const result = await Game.aggregate([
        {
            $match: {
                status: 'CREATED'
            }
        },
        { $limit: 1 },
        { $lookup: {
                from: "bets",
                let: { "bets": "$bets" },
                pipeline: [
                    {
                        $match: {
                            "$expr": {
                                "$in": [ "$_id", "$$bets" ]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "items",
                            let: { "item": "$item" },
                            pipeline: [
                                { "$match": { "$expr": { "$eq": [ "$_id", "$$item" ] } } }
                            ],
                            as: "item"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            let: { "user": "$user" },
                            pipeline: [
                                { "$match": { "$expr": { "$eq": [ "$_id", "$$user" ] } } }
                            ],
                            as: "user"
                        }
                    },
                    {
                        $addFields: {
                            "user": { "$arrayElemAt": [ "$user", 0 ] },
                            "item": { "$arrayElemAt": [ "$item", 0 ] },
                        }
                    }
                ],
                as: "bets"
            }}
    ]);

    return result[0];
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

    const winnerBet = await Bet.findOne({
        game: mongoose.Types.ObjectId(id),
        ticketFrom: { $lte: winnerTicket },
        ticketTo: { $gte: winnerTicket }
    }).populate('user');

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

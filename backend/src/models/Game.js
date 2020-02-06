import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Transaction from 'src/models/Transaction';

const { Schema } = mongoose;

const gameSchema = new Schema({
    transactions: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'transaction'
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
                from: "transactions",
                let: { "transactions": "$transactions" },
                pipeline: [
                    { $match: { "$expr": { "$in": [ "$_id", "$$transactions" ] } } },
                    { $lookup: {
                            from: "users",
                            let: { "user": "$user" },
                            pipeline: [
                                { "$match": { "$expr": { "$eq": [ "$_id", "$$user" ] } } }
                            ],
                            as: "user"
                        }},
                    { $addFields: {
                            "user": { "$arrayElemAt": [ "$user", 0 ] }
                        }}
                ],
                as: "transactions"
            }}
    ]);

    return result[0];
};

Game.create = async (data) => {
    return new Game(data).save()
};

Game.findById = async (id) => {
    console.log('find by id, id', id)
    return await Game.findOne({
        _id: mongoose.Types.ObjectId(id)
    });
};

Game.update = async (data) => {
    return await Game.update()
};

Game.getWinnerById = async (id) => {
    const game = await Game.findById(id);
    const lastGameTransaction = await Transaction.getLastInGameByGameId(id);

    const ticketsCount = lastGameTransaction.ticketTo;

    const secret = game.secret;
    const winnerTicket = Math.floor(secret * ticketsCount);

    const winnerTransaction = await Transaction.findOne({
        game: mongoose.Types.ObjectId(id),
        ticketFrom: { $lte: winnerTicket },
        ticketTo: { $gte: winnerTicket }
    }).populate('user');

    console.log('Получил победную транзакцию', winnerTransaction);
    winnerTransaction.winnerTicket = winnerTicket;
    return {
        transaction: winnerTransaction,
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

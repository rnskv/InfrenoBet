import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';

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

};

export default Game;

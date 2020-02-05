import mongoose from 'mongoose';

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Game from 'src/models/Game';
import config from 'src/config';

const getHandler = async (ctx) => {

};

const getAllHandler = async (ctx) => {

};

const createHandler = async (ctx) => {
    console.log('try create game', ctx.request.body);
    const {
        secret,
        hash
    } = ctx.request.body;

    const existedGame = await Game.aggregate([
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

    if (existedGame[0]) {
        console.log(existedGame[0])
        ctx.body = existedGame[0];
    } else {
        const game = await new Game({ secret, hash }).save();
        ctx.body = game
    }
};

export const create = new Action({
    method: 'post',
    url: '/',
    handler: createHandler,
});

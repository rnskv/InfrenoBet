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
                    let: { "ownerId": "$ownerId" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": [ "$_id", "$$ownerId" ] } } }
                    ],
                    as: "user"
                }},
                { $addFields: {
                    "user": { "$arrayElemAt": [ "$user", 0 ] }
                }}
            ],
            as: "transactions"
        }},
        { $lookup: {
            from: "users",
            let: { "users": "$users" },
            pipeline: [
                { $match: { "$expr": { "$in": [ "$_id", "$$users" ] } } },
            ],
            as: "users"
        }},
    ]);

    if (existedGame[0]) {
        ctx.body = await existedGame[0];
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

import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
const request = require('request-promise');

import { USER_ALREADY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD, USER_WRONG_REGISTER_DATA } from 'shared/configs/notificationsTypes';
const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URL, VK_CLOSE_PAGE_URL } = process.env;

function createToken({ payload, expiresIn = 1000 * 60 * 60 * 24 }) {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn });
    return `Bearer ${token}`;

}
const registerHandler = async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const user = await User.findOne({ email }).populate({
        path: 'inventory',
        model: 'item'
    });

    if (!password || !email) {
        ctx.throw({ type: USER_WRONG_REGISTER_DATA });
    }

    if (user) {
        console.log('User already exist');
        ctx.throw({ type: USER_ALREADY_EXIST });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await new User({ email, name, password: hash, avatar: `https://api.adorable.io/avatars/70/${email}`}).save();

    ctx.body = {
        ok: true
    }
};

const loginHandler = async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email }).populate({
        path: 'inventory',
        model: 'item'
    });

    if (!user) {
        ctx.throw({ type: USER_NOT_FOUND });
    }

    const isEqualPasswords = await bcrypt.compare(password, user.password);

    if (isEqualPasswords) {
        const token = createToken({
            payload: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });

        ctx.body = { token };
    } else {
        ctx.throw({ type: USER_WRONG_PASSWORD });
    }
};


const loginVkHandler = (ctx) => {
    const { user } = ctx.state;
    console.log( user._id );
    const token = createToken({
        payload: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    });

    ctx.cookies.set('token', token, { httpOnly: false });

    ctx.redirect(VK_CLOSE_PAGE_URL);
};

const loginVkGetCodeHandler = async (ctx) => {
    if (ctx.query.code) {
        const res = await request(`
            https://oauth.vk.com/access_token?client_id=${VK_CLIENT_ID}&client_secret=${VK_CLIENT_SECRET}&redirect_uri=${VK_REDIRECT_URL}&code=${ctx.query.code}
        `).catch((err) => {
            console.log('error from vk', err.response.body)
        });

        ctx.redirect('/api/auth/vk?access_token='+JSON.parse(res)["access_token"])
    }
};

export const loginVk = new Action({
    method: 'get',
    url: '/vk',
    handler: loginVkHandler,
    middlewares: [passport.authenticate('vkontakte-token')],
});

export const loginVkGetCode = new Action({
    method: 'get',
    url: '/vk/code',
    handler: loginVkGetCodeHandler,
});

export const login = new Action({
    method: 'post',
    url: '/login',
    handler: loginHandler,
});

export const register = new Action({
    method: 'post',
    url: '/register',
    handler: registerHandler,
});

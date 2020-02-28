import Action from 'src/core/Action';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';

import { USER_ALREAY_EXIST, USER_NOT_FOUND, USER_WRONG_PASSWORD } from 'shared/configs/notificationsTypes';

const registerHandler = async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (user) {
        ctx.throw({ type: USER_ALREAY_EXIST });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await new User({ email, name, password: hash }).save();

    ctx.body = {
        ok: true
    }
};

const loginHandler = async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (!user) {
        ctx.throw({ type: USER_NOT_FOUND });
    }

    const isEqualPasswords = await bcrypt.compare(password, user.password);

    if (isEqualPasswords) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 1000 * 60 * 60 * 24 });

        ctx.body = { token: `Bearer ${token}` };
    } else {
        ctx.throw({ type: USER_WRONG_PASSWORD });
    }
};


export const login = new Action({
    method: 'post',
    url: '/login',
    handler: loginHandler,
});

export const post = new Action({
    method: 'post',
    url: '/register',
    handler: registerHandler,
});

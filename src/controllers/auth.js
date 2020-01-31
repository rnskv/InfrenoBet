import Router from 'koa-router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'src/models/User';
import config from 'src/config';

const router = new Router().prefix('/auth');

router.post('/register', async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (user) {
        ctx.throw(400, 'User already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await new User({ email, name, password: hash }).save();
    ctx.status = 200;
});

router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (!user) {
        ctx.throw(400, 'User is not found');
    }

    const isEqualPasswords = await bcrypt.compare(password, user.password);

    if (isEqualPasswords) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 1000 * 60 * 60 * 24 });

        ctx.body = { token: `Bearer: ${token}` };
    } else {
        ctx.throw(400, 'Password incorrect');
    }
});

export default router.routes();

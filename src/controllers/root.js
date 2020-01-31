import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router().prefix('/root');

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (ctx) => {
        ctx.status = 200;
    },
);

export default router.routes();

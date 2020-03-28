import Action from 'src/core/Action';
import passport from 'koa-passport';

const getHandler = async (ctx) => {
    ctx.body = {
        body: 'Hello from action get ' + ctx.state.user.name
    };
};

const postHandler = async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        body: 'Hello from action post'
    };
};

export const root = new Action({
    method: 'get',
    url: '/',
    middlewares: [passport.authenticate('jwt')],
    handler: getHandler,
});

export const post = new Action({
    method: 'post',
    url: '/',
    handler: postHandler,
});

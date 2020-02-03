import Action from 'src/core/Action';
import passport from 'koa-passport';

const getHandler = async (ctx) => {
    console.log('???')
    ctx.body = {
        body: 'Hello from action get'
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
    middleware: passport.authenticate('jwt'),
    handler: getHandler,
});

export const post = new Action({
    method: 'post',
    url: '/',
    handler: postHandler,
});

import Action from 'src/core/Action';
import Commission from 'src/models/Comission';

const getHandler = async (ctx) => {
    const { params } = ctx.request.body;
    ctx.body = await Commission.getByParams(params);
};

export const register = new Action({
    method: 'get',
    url: '/',
    handler: getHandler,
    // middlewares: [passport.authenticate('jwt'), accessMiddleware({ accessLevel: 100 })],
});

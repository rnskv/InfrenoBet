import bodyParser from './body-parser';
import errors from './errors';
import passport from './passport';
import cors from './cors';

export const useMiddlewares = (app) => {
    [cors, bodyParser, errors, passport].forEach((middleware) => {
        app.use(middleware);
    });
};

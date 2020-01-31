import bodyParser from './body-parser';
import errors from './errors';
import passport from './passport';

export const useMiddlewares = (app) => {
    [bodyParser, errors, passport].forEach((middleware) => {
        app.use(middleware);
    });
};

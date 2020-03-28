class Action {
    constructor({
        method = 'get',
        url = '/',
        middlewares = [],
        handler = (ctx) => { ctx.status = 500; },
    }) {
        this._method = method;
        this._url = url;
        this._middlewares = middlewares;
        this._handler = handler;
    }

    registerToRouter(router) {
        router[this._method](this._url, ...this._middlewares, this._handler);
    }
}

export default Action;

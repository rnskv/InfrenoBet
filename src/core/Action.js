class Action {
    constructor({
        method = 'get',
        url = '/',
        middleware = null,
        handler = (ctx) => { ctx.status = 500; },
    }) {
        this._method = method;
        this._url = url;
        this._middleware = middleware;
        this._handler = handler;
    }

    registerToRouter(router) {
        if (this._middleware) {
            router[this._method](this._url, this._middleware, this._handler);
        } else {
            router[this._method](this._url, this._handler);
        }
    }
}

export default Action;

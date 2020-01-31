class Action {
    constructor({
        method = 'get',
        url = '/',
        middleware = (ctx, next) => { next(); },
        callback = (ctx) => { ctx.status = 500; },
    }) {
        this._method = method;
        this._url = url;
        this._middleware = middleware;
        this._callback = callback;
    }

    registerToRouter(router) {
        console.log('register', this._method, this._url, router);
        router[this._method](this._url, this._middleware, this._callback);
    }
}

export default Action;

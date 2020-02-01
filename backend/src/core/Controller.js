import Router from 'koa-router';
import * as actions from "../controllers/root/actions";

export default class Controller {
    constructor({ prefix, actions }) {
        this._router = new Router().prefix(prefix);
        this._useActions(actions)
    }

    get routes() {
        return this._router.routes();
    }

    get allowedMethods() {
        return this._router.allowedMethods();
    }

    _useActions(actions) {
        for (let action of Object.values(actions)) {
            action.registerToRouter(this._router);
        }
    }
}

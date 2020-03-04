import Module from 'src/core/Module';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

class Store extends Module {
    constructor({
        actionsTypes, actions, reducers, ...params
    }) {
        super({ ...params });
        this.store = null;

        this.actionsTypes = actionsTypes;
        this.actions = actions;
        this.reducers = reducers;
        this.domains = null;

        this.instanse = null;
    }

    get dispatch() {
        return this.instanse.dispatch;
    }

    get getState() {
        return this.instanse.getState;
    }

    setDomains(domains) {
        this.domains = {};
        Object.keys(domains).forEach((name) => {
            this.domains[name] = domains[name]({ app: this.app });
        });
    }

    create() {
        this.instanse = createStore(
            combineReducers(this.reducers),
            applyMiddleware(thunk),
        );
    }
}

export default Store;

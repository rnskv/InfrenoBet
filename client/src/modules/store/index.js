import Module from 'src/core/Module';
import {
    createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

class Store extends Module {
    constructor({
        actionsTypes, actions, domains, reducers, ...params
    }) {
        super({ ...params });
        this.store = null;

        this.actionsTypes = actionsTypes;
        this.actions = actions;
        this.reducers = reducers;
        this.domains = domains;

        this.instanse = null;
    }

    get dispatch() {
        return this.instanse.dispatch;
    }

    get getState() {
        return this.instanse.getState;
    }

    provideApp() {
        Object.keys(this.domains).forEach((name) => {
            console.log(this.domains)
            // console.log(this.domains[name], name)
            this.domains[name] = this.domains[name]({ app: this.app });
        });
    }

    create() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        this.instanse = createStore(
            combineReducers(this.reducers),
            composeEnhancers(applyMiddleware(thunk)),
        );
    }
}

export default Store;

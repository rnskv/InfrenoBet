import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import * as userActions from './user/actions';


export const reducers = {
    user: userReducer,
};

export const actions = [
    userActions,
];

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
);

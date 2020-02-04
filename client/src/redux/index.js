import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import gameReducer from './game/reducer';

import * as userActions from './user/actions';
import * as gameActions from './game/actions';


export const reducers = {
    user: userReducer,
    game: gameReducer
};

export const actions = [
    userActions,
    gameActions,
];

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
);

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import gameReducer from './game/reducer';
import betMakerReducer from './betMaker/reducer';

import * as userActions from './user/actions';
import * as gameActions from './game/actions';
import * as betMakerActions from './betMaker/actions';

export const reducers = {
    user: userReducer,
    game: gameReducer,
    betMaker: betMakerReducer,
};

export const actions = {
    user: userActions,
    game: gameActions,
    betMaker: betMakerActions,
};

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
);

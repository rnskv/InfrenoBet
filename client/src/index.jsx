import React from 'react';
import 'babel-polyfill';

import ReactDOM from 'react-dom';

import apiServices from 'src/services/api';

import * as userActionsTypes from 'src/redux/user/actionsTypes';
import * as gameActionsTypes from 'src/redux/game/actionsTypes';
import * as betMakerActionTypes from 'src/redux/betMaker/actionsTypes';

import userDomains from 'src/redux/user/domains';
import gameDomains from 'src/redux/game/domains';
import betMakerDomains from 'src/redux/betMaker/domains';

import userReducer from 'src/redux/user/reducer';
import gameReducer from 'src/redux/game/reducer';
import betMakerReducer from 'src/redux/betMaker/reducer';

import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';

import Store from 'src/modules/store';
import Api from 'src/modules/api';
import Realtime from 'src/modules/realtime';
import View from 'src/modules/view';

import events from 'src/services/events';

import Application from './core/Application';

const { REALTIME_PROTOCOL, REALTIME_PORT, REALTIME_HOST } = process.env;

export const api = new Api({ name: 'api' });

export const view = new View({ name: 'view' });

export const realtime = new Realtime({ name: 'realtime' });

export const store = new Store({
    name: 'store',
    actionsTypes: {
        user: userActionsTypes,
        game: gameActionsTypes,
        betMaker: betMakerActionTypes,
    },
    actions: {
        user: userActions,
        game: gameActions,
        betMaker: betMakerActions,
    },
    reducers: {
        user: userReducer,
        game: gameReducer,
        betMaker: betMakerReducer,
    },
    domains: {
        user: userDomains,
        game: gameDomains,
        betMaker: betMakerDomains,
    },
});


export const infernoClient = new Application({
    config: {},
});

store.create();

infernoClient
    .use(store)
    .use(api)
    .use(realtime)
    .use(view)
    .run();
api.connect({
    services: apiServices,
});

store.setDomains({
    user: userDomains,
    game: gameDomains,
    betMaker: betMakerDomains,
});

realtime.connect(`${REALTIME_PROTOCOL}://${REALTIME_HOST}:${REALTIME_PORT}`);

realtime.listenEvents(events);

view.render();

import 'babel-polyfill';

import {
    onApplicationRunCallback,
    afterApplicationSetupCallback,
    onApplicationFailedRunCallback,
} from 'src/helpers/setup';

import * as userActionsTypes from 'src/redux/user/actionsTypes';
import * as gameActionsTypes from 'src/redux/game/actionsTypes';
import * as betMakerActionTypes from 'src/redux/betMaker/actionsTypes';

import actions from 'src/redux/actions';
import domains from 'src/redux/domains';
import reducers from 'src/redux/reducers';

import Store from 'src/modules/store';
import Api from 'src/modules/api';
import Realtime from 'src/modules/realtime';
import View from 'src/modules/view';


import Application from './core/Application';


const api = new Api({ name: 'api' });
const view = new View({ name: 'view' });
const realtime = new Realtime({ name: 'realtime' });

export const store = new Store({
    name: 'store',
    actionsTypes: {
        user: userActionsTypes,
        game: gameActionsTypes,
        betMaker: betMakerActionTypes,
    },
    actions,
    domains,
    reducers,
});

export const infernoClient = new Application({
    config: {},
});


infernoClient
    .use(store)
    .use(api)
    .use(realtime)
    .use(view)
    .run(afterApplicationSetupCallback)
    .then(onApplicationRunCallback)
    .catch(onApplicationFailedRunCallback);

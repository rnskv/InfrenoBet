import 'babel-polyfill';

import {
    onApplicationRunCallback,
    afterApplicationSetupCallback,
    onApplicationFailedRunCallback,
} from 'src/helpers/setup';

import * as userActionsTypes from 'src/redux/user/actionsTypes';
import * as gameActionsTypes from 'src/redux/game/actionsTypes';
import * as betMakerActionTypes from 'src/redux/betMaker/actionsTypes';

import userDomains from 'src/redux/user/domains';
import gameDomains from 'src/redux/game/domains';
import betMakerDomains from 'src/redux/betMaker/domains';

import reducers from 'src/redux/reducers';

import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';

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
    actions: {
        user: userActions,
        game: gameActions,
        betMaker: betMakerActions,
    },
    reducers,
    domains: {
        user: userDomains,
        game: gameDomains,
        betMaker: betMakerDomains,
    },
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

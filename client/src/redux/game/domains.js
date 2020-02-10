import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as actions from './actions';
import * as userActions from 'src/redux/user/actions';

import { authApi } from '../user/api';

let isSubscribed = false;
export const subscribe = () => async (dispatch) => {
    if (isSubscribed) return;
    console.log('Subscribed to something');
    isSubscribed = true;
};

export const join = () => async (dispatch) => {
    ws.io.emit('game.join', { name: 'Roma' });
};

export const transaction = () => async (dispatch) => {
    ws.io.emit('game.transaction', { user: { name: 'Roma' }, value: 100 });
    dispatch(actions.transactionSended());
};
// ws.io.emit('game.sync');
// ws.io.emit('game.join');
// ws.io.emit('game.transaction');
// ws.io.emit('game.start');
// ws.io.emit('game.tick');
// ws.io.emit('game.end');
// ws.io.emit('game.reset');

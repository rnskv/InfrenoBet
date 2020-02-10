import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as actions from './actions';
import * as userActions from 'src/redux/user/actions';

import { authApi } from '../user/api';

let isSubscribed = false;
export const subscribe = () => async (dispatch) => {
    if (isSubscribed) return;
    console.log('Subscribed to something');

    ws.io.emit('game.sync');

    ws.io.on('game.join', (userData) => {
        dispatch(actions.join({ userData }));
    });

    ws.io.on('game.transaction', ({ transaction, bank, users }) => {
        dispatch(actions.transaction({ transaction, bank, users }));
    });

    ws.io.on('game.start', (game) => {
        dispatch(actions.start({ game }));
    });

    ws.io.on('game.tick', (time) => {
        dispatch(actions.tick({ time }));
    });

    ws.io.on('game.getWinner', ({ winner, secret }) => {
        dispatch(actions.getWinner({ winner, secret }));
    });

    ws.io.on('game.reset', (state) => {
        dispatch(actions.reset({ state }));
    });

    ws.io.on('game.sync', (state) => {
        dispatch(actions.sync({ state }));
    });

    ws.io.on('game.waitingTransactions', ({ transactionsPoolLength }) => {
        dispatch(actions.waitingTransactions({ transactionsPoolLength }));
    });

    ws.io.on('game.startRoulette', () => {
        dispatch(actions.startRoulette());
    });

    ws.io.on('game.roulette.update', (state) => {
        dispatch(actions.updateRoulette({ state }));
    });

    ws.io.on('game.transactionAccepted', () => {
        console.log('Мой депозит принят');
        dispatch(actions.transactionAccepted());
    });

    ws.io.on('user.error', (notification) => {
        console.log(notification)
        dispatch(userActions.addNotification({ notification }));
    });

    ws.io.on('project.error', (error) => {
        alert(error);
    });

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

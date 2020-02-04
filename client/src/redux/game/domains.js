import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as actions from './actions';
import { authApi } from '../user/api';

export const subscribe = () => async (dispatch) => {
    console.log('Subscribed to something');


    ws.io.emit('game.sync');

    ws.io.on('game.join', (userData) => {
        dispatch(actions.join({userData}));
    });

    ws.io.on('game.transaction', (transactionData) => {
        dispatch(actions.transaction({transactionData}));
    });

    ws.io.on('game.start', (game) => {
        dispatch(actions.start({ game }));
    });

    ws.io.on('game.tick', (time) => {
        dispatch(actions.tick({ time }));
    });

    ws.io.on('game.getWinner', ({winner, secret}) => {
        dispatch(actions.getWinner({ winner, secret }));
    });

    ws.io.on('game.reset', (state) => {
        dispatch(actions.reset({ state }));
    });

    ws.io.on('game.sync', (state) => {
        dispatch(actions.sync({ state }));
    });

    setTimeout(() => {
    }, 5000);
};

export const join = () => async (dispatch) => {
    ws.io.emit('game.join', { name: 'Roma' });
};
// ws.io.emit('game.sync');
// ws.io.emit('game.join');
// ws.io.emit('game.transaction');
// ws.io.emit('game.start');
// ws.io.emit('game.tick');
// ws.io.emit('game.end');
// ws.io.emit('game.reset');

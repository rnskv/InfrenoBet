import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as actions from './actions';
import { authApi } from '../user/api';

export const subscribe = () => async (dispatch) => {
    console.log('Subscribed to something');
    ws.io.on('connection', () => {
        console.log('connect');
    });

    ws.io.on('game.join', (userData) => {
        console.log(userData)
        dispatch(actions.join({ user: { name: 'Roma' } }));
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

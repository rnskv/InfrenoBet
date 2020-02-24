import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as userActions from 'src/redux/user/actions';
import { TRANSACTION_SENDING } from 'shared/configs/notificationsTypes';
import * as actions from './actions';

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

export const transaction = ({ values }) => async (dispatch) => {
    const totalBet = values.reduce((acc, value) => acc + value, 0);
    ws.io.emit('game.transaction', { values });

    dispatch(actions.transactionSended());
    dispatch(userActions.addNotification({
        type: TRANSACTION_SENDING,
        params: {
            text: `Ваша ставка на сумму ${totalBet}₽ находится в очереди.
                   Она будет добавлена в игру через ~${values.length * 1} сек.`,
        },
    }));
    dispatch(userActions.changeBalance({ amount: -totalBet }));
};
// ws.io.emit('game.sync');
// ws.io.emit('game.join');
// ws.io.emit('game.transaction');
// ws.io.emit('game.start');
// ws.io.emit('game.tick');
// ws.io.emit('game.end');
// ws.io.emit('game.reset');

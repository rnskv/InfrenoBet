import { TRANSACTION_SENDING } from 'shared/configs/notificationsTypes';

export default ({ app }) => {
    const { realtime, store } = app.modules;
    const { actions, domains } = store;

    let isSubscribed = false;
    const subscribe = () => async (dispatch) => {
        if (isSubscribed) return;
        isSubscribed = true;
    };

    const join = () => async (dispatch) => {
        realtime.io.emit('game.join', { name: 'Roma' });
    };

    const transaction = ({ values }) => async (dispatch) => {
        const totalBet = values.reduce((acc, value) => acc + value, 0);
        realtime.io.emit('game.transaction', { values });

        dispatch(actions.game.transactionSended());
        dispatch(actions.user.addNotification({
            type: TRANSACTION_SENDING,
            params: {
                text: `Ваша ставка на сумму ${totalBet}₽ находится в очереди.
                   Она будет добавлена в игру через ~${values.length * 1} сек.`,
            },
        }));
        dispatch(actions.user.changeBalance({ amount: -totalBet }));
    };

    return {
        subscribe,
        join,
        transaction,
    };
};

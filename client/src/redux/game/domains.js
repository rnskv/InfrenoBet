import { BET_SENDING } from 'shared/configs/notificationsTypes';
import { getExchangedSum } from 'src/helpers/system';

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

    const addBet = ({ items }) => async (dispatch) => {
        const totalBet = items.reduce((acc, item) => acc + item.cost, 0);
        realtime.io.emit('game.bet', { items });

        dispatch(actions.game.betSended());
        dispatch(actions.user.addNotification({
            type: BET_SENDING,
            params: {
                text: `Ваша ставка на сумму ${getExchangedSum(totalBet)} находится в очереди.
                   Она будет добавлена в игру через ~${items.length * 1} сек.`,
            },
        }));
        dispatch(actions.user.changeBalance({ amount: -totalBet }));
    };

    return {
        subscribe,
        join,
        addBet,
    };
};

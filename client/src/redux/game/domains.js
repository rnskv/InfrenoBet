import { BET_SENDING } from 'shared/configs/notificationsTypes';
import { getExchangedSum } from 'src/helpers/system';
import { getWinnerInfoFromGame } from 'shared/helpers/game';

export default ({ app }) => {
    const { realtime, store, api } = app.modules;
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
        const totalBet = items.reduce((acc, item) => acc + item.parent.cost, 0);
        realtime.io.emit('game.roulette.bet', { items });

        dispatch(actions.game.betSended());
        // dispatch(actions.user.changeBalance({ amount: -totalBet }));
    };

    const getLastWinner = () => async (dispatch) => {
        const game = await api.services.games.execute('getLastFinished');
        const winner = getWinnerInfoFromGame(game);
        dispatch(actions.game.setLastWinner({ winner }));
    };

    const getLuckyWinner = () => async (dispatch) => {
        const game = await api.services.games.execute('getLucky');
        const winner = getWinnerInfoFromGame(game);
        dispatch(actions.game.setLuckyWinner({ winner }));
    };

    const getGreatestWinner = () => async (dispatch) => {
        const game = await api.services.games.execute('getGreatest');
        const winner = getWinnerInfoFromGame(game);
        dispatch(actions.game.setGreatestWinner({ winner }));
    };

    return {
        subscribe,
        join,
        addBet,
        getLastWinner,
        getGreatestWinner,
        getLuckyWinner,
    };
};

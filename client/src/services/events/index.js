import * as notificationsTypes from '../../../../shared/configs/notificationsTypes';

export default function ({ app }) {
    const { realtime, store } = app.modules;
    const { actions, domains } = store;

    store.dispatch(domains.user.getProfile());

    realtime.io.emit('game.sync');

    realtime.io.on('disconnect', () => {
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.REALTIME_DISCONNECTED }));
    });

    realtime.io.on('game.join', (userData) => {
        store.dispatch(actions.game.join({ userData }));
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.transactions', ({ transactions, bank, users }) => {
        store.dispatch(actions.game.transactions({ transactions, bank, users }));
        // for synchronization
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.start', (game) => {
        store.dispatch(actions.game.start({ game }));
    });

    realtime.io.on('game.tick', (time) => {
        store.dispatch(actions.game.tick({ time }));
    });

    realtime.io.on('game.getWinner', ({ winner, secret }) => {
        store.dispatch(actions.game.getWinner({ winner, secret }));
    });

    realtime.io.on('game.reset', (state) => {
        store.dispatch(actions.game.reset({ state }));
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.sync', (state) => {
        store.dispatch(actions.game.sync({ state }));
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.waitingTransactions', ({ transactionsPoolLength }) => {
        store.dispatch(actions.game.waitingTransactions({ transactionsPoolLength }));
    });

    realtime.io.on('game.startRoulette', () => {
        store.dispatch(actions.game.startRoulette());
    });

    realtime.io.on('game.roulette.update', (state) => {
        store.dispatch(actions.game.updateRoulette({ state }));
    });

    realtime.io.on('game.transactionAccepted', () => {
        console.log('Мой депозит принят');
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.TRANSACTION_ACCEPTED }));
        store.dispatch(actions.game.transactionAccepted());
    });

    realtime.io.on('game.win', () => {
        console.log('Вы победили');
        // store.dispatch(actions.game.transactionAccepted());
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.USER_WIN }));
    });

    realtime.io.on('user.error', (notification) => {
        alert(notification);
        // store.dispatch(actions.user.addNotification({ notification }));
    });

    realtime.io.on('project.error', ({ type }) => {
        store.dispatch(actions.user.addNotification({ type }));
        // alert(error);
    });
}

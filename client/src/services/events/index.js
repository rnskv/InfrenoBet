import * as notificationsTypes from 'shared/configs/notificationsTypes';

export default function ({ app }) {
    const { realtime, store } = app.modules;
    const { actions, domains } = store;

    store.dispatch(domains.user.getProfile());
    store.dispatch(domains.betMaker.getItems());

    realtime.io.emit('game.roulette.sync');

    realtime.io.on('disconnect', () => {
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.REALTIME_DISCONNECTED }));
    });

    realtime.io.on('game.join', (userData) => {
        store.dispatch(actions.game.join({ userData }));
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.bets', ({ bets, bank, users }) => {
        store.dispatch(actions.game.addBets({ bets, bank, users }));
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

    realtime.io.on('game.roulette.sync', (state) => {
        store.dispatch(actions.game.sync({ state }));
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('game.waitingLastBets', ({ betsQueueLength }) => {
        store.dispatch(actions.user.addNotification({
            type: notificationsTypes.WAITING_LAST_BETS,
            params: {
                text: `Обрабатываются последние ставки. Ставок в очереди: ${betsQueueLength}`,
            },
        }));
        store.dispatch(actions.game.waitingLastBets({ betsQueueLength }));
    });

    realtime.io.on('game.startRoulette', () => {
        store.dispatch(actions.game.startRoulette());
    });

    realtime.io.on('game.roulette.update', (state) => {
        store.dispatch(actions.game.updateRoulette({ state }));
    });

    realtime.io.on('game.roulette.betWasAccepted', () => {
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.BET_ACCEPTED }));
        store.dispatch(actions.game.betAccepted());
    });

    realtime.io.on('game.win', () => {
        store.dispatch(actions.user.addNotification({ type: notificationsTypes.USER_WIN }));
    });

    realtime.io.on('user.error', (notification) => {
        store.dispatch(actions.user.addNotification({ notification }));
    });

    realtime.io.on('project.inventory.add', ({ type, params }) => {
        store.dispatch(domains.user.getProfile());
    });

    realtime.io.on('project.notification', ({ type, params }) => {
        store.dispatch(actions.user.addNotification({ type, params }));
    });
}

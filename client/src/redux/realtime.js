import { ws } from 'src/modules/realtime';
import { store, actions } from './index';

ws.io.emit('game.sync');

ws.io.on('game.join', (userData) => {
    store.dispatch(actions.game.join({ userData }));
});

ws.io.on('game.transaction', ({ transaction, bank, users }) => {
    store.dispatch(actions.game.transaction({ transaction, bank, users }));
});

ws.io.on('game.start', (game) => {
    store.dispatch(actions.game.start({ game }));
});

ws.io.on('game.tick', (time) => {
    store.dispatch(actions.game.tick({ time }));
});

ws.io.on('game.getWinner', ({ winner, secret }) => {
    store.dispatch(actions.game.getWinner({ winner, secret }));
});

ws.io.on('game.reset', (state) => {
    store.dispatch(actions.game.reset({ state }));
});

ws.io.on('game.sync', (state) => {
    store.dispatch(actions.game.sync({ state }));
});

ws.io.on('game.waitingTransactions', ({ transactionsPoolLength }) => {
    store.dispatch(actions.game.waitingTransactions({ transactionsPoolLength }));
});

ws.io.on('game.startRoulette', () => {
    store.dispatch(actions.game.startRoulette());
});

ws.io.on('game.roulette.update', (state) => {
    store.dispatch(actions.game.updateRoulette({ state }));
});

ws.io.on('game.transactionAccepted', () => {
    console.log('Мой депозит принят');
    store.dispatch(actions.game.transactionAccepted());
});

ws.io.on('user.error', (notification) => {
    console.log(notification);
    store.dispatch(actions.user.addNotification({ notification }));
});

ws.io.on('project.error', (error) => {
    alert(error);
});

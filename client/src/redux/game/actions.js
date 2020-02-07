import * as actionTypes from './actionsTypes';

export const join = (payload) => ({
    type: actionTypes.GAME_JOIN,
    payload,
});

export const transaction = (payload) => ({
    type: actionTypes.GAME_TRANSACTION,
    payload,
});

export const start = (payload) => ({
    type: actionTypes.GAME_START,
    payload,
});

export const tick = (payload) => ({
    type: actionTypes.GAME_TICK,
    payload,
});

export const getWinner = (payload) => ({
    type: actionTypes.GAME_GET_WINNER,
    payload,
});

export const reset = (payload) => ({
    type: actionTypes.GAME_RESET,
    payload,
});

export const sync = (payload) => ({
    type: actionTypes.GAME_SYNC,
    payload,
});

export const waitingTransactions = (payload) => ({
    type: actionTypes.GAME_WAITING_TRANSACTIONS,
    payload,
});

export const startRoulette = (payload) => ({
    type: actionTypes.GAME_START_ROULETTE,
    payload,
});

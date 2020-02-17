import * as actionTypes from './actionsTypes';

export const join = (payload) => ({
    type: actionTypes.GAME_JOIN,
    payload,
});

export const transactions = (payload) => ({
    type: actionTypes.GAME_TRANSACTIONS,
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

export const updateRoulette = (payload) => ({
    type: actionTypes.GAME_UPDATE_ROULETTE,
    payload,
});

export const transactionAccepted = (payload) => ({
    type: actionTypes.GAME_TRANSACTION_ACCEPTED,
    payload,
});

export const transactionSended = (payload) => ({
    type: actionTypes.GAME_TRANSACTION_SENDED,
    payload,
});

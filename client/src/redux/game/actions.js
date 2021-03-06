import * as actionTypes from './actionsTypes';

export const join = (payload) => ({
    type: actionTypes.GAME_JOIN,
    payload,
});

export const addBets = (payload) => ({
    type: actionTypes.GAME_ADD_BETS,
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

export const waitingLastBets = (payload) => ({
    type: actionTypes.GAME_WAITING_LAST_BETS,
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

export const betAccepted = (payload) => ({
    type: actionTypes.GAME_BET_ACCEPTED,
    payload,
});

export const betSended = (payload) => ({
    type: actionTypes.GAME_BET_SENDED,
    payload,
});

export const setLastWinner = (payload) => ({
    type: actionTypes.GAME_SET_LAST_WINNER,
    payload,
});

export const setLuckyWinner = (payload) => ({
    type: actionTypes.GAME_SET_LUCKY_WINNER,
    payload,
});

export const setGreatestWinner = (payload) => ({
    type: actionTypes.GAME_SET_GREATEST_WINNER,
    payload,
});

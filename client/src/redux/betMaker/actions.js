import * as actionTypes from './actionsTypes';

export const open = () => ({
    type: actionTypes.OPEN_BET_MAKER,
});

export const close = () => ({
    type: actionTypes.CLOSE_BET_MAKER,
});

export const addBetInBetMaker = (payload) => ({
    type: actionTypes.ADD_BET_IN_BET_MAKER,
    payload,
});

export const removeBetFromBetMaker = (payload) => ({
    type: actionTypes.REMOVE_BET_FROM_BET_MAKER,
    payload,
});

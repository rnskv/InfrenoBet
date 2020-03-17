import * as actionTypes from './actionsTypes';

export const open = () => ({
    type: actionTypes.OPEN_BET_MAKER,
});

export const close = () => ({
    type: actionTypes.CLOSE_BET_MAKER,
});

export const addItemInBetMaker = (payload) => ({
    type: actionTypes.ADD_ITEM_IN_BET_MAKER,
    payload,
});

export const removeItemFromBetMaker = (payload) => ({
    type: actionTypes.REMOVE_ITEM_FROM_BET_MAKER,
    payload,
});

export const addItems = (payload) => ({
    type: actionTypes.BET_MAKER_ADD_ITEMS,
    payload,
});

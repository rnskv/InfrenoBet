import * as actionTypes from './actionsTypes';

export const join = (payload) => ({
    type: actionTypes.GAME_JOIN,
    payload,
});

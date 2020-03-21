import * as actionTypes from './actionsTypes';

export const changeTab = ({ name }) => ({
    type: actionTypes.CASHIER_CHANGE_TAB,
    payload: {
        name,
    },
});

export const changeValue = ({ value }) => ({
    type: actionTypes.CASHIER_CHANGE_VALUE,
    payload: {
        value,
    },
});

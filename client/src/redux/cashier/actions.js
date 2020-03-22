import * as actionTypes from './actionsTypes';

export const changeDepositTab = ({ name }) => ({
    type: actionTypes.CASHIER_CHANGE_DEPOSIT_TAB,
    payload: {
        name,
    },
});

export const changeWithdrawTab = ({ name }) => ({
    type: actionTypes.CASHIER_CHANGE_WITHDRAW_TAB,
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

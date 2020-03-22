import * as actionTypes from './actionsTypes';

const initialState = {
    activeDepositTabName: 'CREDIT_CARDS',
    activeWithdrawTabName: '',
    value: 0,
};

function cashierReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.CASHIER_CHANGE_DEPOSIT_TAB: {
        return {
            ...state,
            activeDepositTabName: action.payload.name,
        };
    }
    case actionTypes.CASHIER_CHANGE_WITHDRAW_TAB: {
        return {
            ...state,
            activeWithdrawTabName: action.payload.name,
        };
    }
    case actionTypes.CASHIER_CHANGE_VALUE: {
        return {
            ...state,
            value: action.payload.value,
        };
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default cashierReducer;

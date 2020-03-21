import * as actionTypes from './actionsTypes';

const initialState = {
    activeTabName: 'CREDIT_CARDS',
    value: 2.5,
};

function cashierReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.CASHIER_CHANGE_TAB: {
        return {
            ...state,
            activeTabName: action.payload.name,
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

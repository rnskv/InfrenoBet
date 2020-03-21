import * as actionTypes from './actionsTypes';

const initialState = {
    activeTabName: 'CREDIT_CARDS',
};

function cashierReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.CASHIER_CHANGE_TAB: {
        return {
            ...state,
            activeTabName: action.payload.name,
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

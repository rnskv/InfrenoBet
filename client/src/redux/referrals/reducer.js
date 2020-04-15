import * as actionTypes from './actionsTypes';

const initialState = {
    isLoading: false,
    totalCount: 0,
    users: [],
    amount: 0,
};

function referralsReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.SET_REFERRALS_STATISTIC: {
        return {
            ...state,
            ...action.payload,
        };
    }

    case actionTypes.SET_CASH_OUT_IS_LOADING: {
        return {
            ...state,
            cashOutIsLoading: action.payload,
        };
    }

    case actionTypes.SET_STATISTICS_IS_LOADING: {
        return {
            ...state,
            statisticsIsLoading: action.payload,
        };
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default referralsReducer;

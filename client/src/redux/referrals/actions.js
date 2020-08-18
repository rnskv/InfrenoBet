import * as actionTypes from './actionsTypes';

export const setStatistics = (payload) => ({
    type: actionTypes.SET_REFERRALS_STATISTIC,
    payload,
});

export const setStatisticsIsLoading = (payload) => ({
    type: actionTypes.SET_STATISTICS_IS_LOADING,
    payload,
});


export const setCashOutIsLoading = (payload) => ({
    type: actionTypes.SET_CASH_OUT_IS_LOADING,
    payload,
});

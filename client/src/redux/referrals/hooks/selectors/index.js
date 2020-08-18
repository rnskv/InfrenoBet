import { useSelector } from 'react-redux';

const SELECTOR = {
    statistics: (state) => ({
        amount: state.referrals.amount,
        users: state.referrals.users,
        totalCount: state.referrals.totalCount,
        isLoading: state.referrals.isLoading,
    }),
    loaders: (state) => ({
        statisticsIsLoading: state.referrals.statisticsIsLoading,
        cashOutIsLoading: state.referrals.cashOutIsLoading,
    }),
};

export const useReferralsStatistics = () => useSelector(SELECTOR.statistics);
export const useReferralsLoaders = () => useSelector(SELECTOR.loaders);

import { getWinnerInfoFromGame } from 'shared/helpers/game';
import {
    REFERRAL_CASHOUT_ERROR,
    REFERRAL_CASHOUT_SUCCESS,
    REFERRAL_CODE_CREATE_SUCCESS,
} from 'shared/configs/notificationsTypes';

export default ({ app }) => {
    const { realtime, store, api } = app.modules;
    const { actions, domains } = store;
    const { addNotification } = store.actions.user;
    const { getProfile } = store.domains.user;

    const createCode = ({ code }) => async (dispatch) => {
        dispatch(actions.referrals.setCashOutIsLoading(true));
        await api.services.referrals.execute('createCode', {
            body: {
                code,
            },
        })
            .then(() => {
                dispatch(addNotification({ type: REFERRAL_CODE_CREATE_SUCCESS }));
            })
            .catch(() => {
            })
            .finally(() => {
                dispatch(getProfile());
                dispatch(actions.referrals.setCashOutIsLoading(false));
            });
    };

    const getMyStatistics = () => async (dispatch) => {
        dispatch(actions.referrals.setStatisticsIsLoading(true));
        const statistics = await api.services.referrals.execute('getMyStatistics');
        dispatch(actions.referrals.setStatistics(statistics));

        dispatch(actions.referrals.setStatisticsIsLoading(false));
    };

    const cashOut = () => async (dispatch) => {
        dispatch(actions.referrals.setCashOutIsLoading(true));
        await api.services.referrals.execute('cashOut')
            .then(() => {
                dispatch(addNotification({ type: REFERRAL_CASHOUT_SUCCESS }));
            })
            .catch(() => {
                dispatch(addNotification({ type: REFERRAL_CASHOUT_ERROR }));
            })
            .finally(() => {
                dispatch(getProfile());
                dispatch(actions.referrals.setStatistics({
                    amount: 0,
                }));
                dispatch(actions.referrals.setCashOutIsLoading(false));
            });
    };

    return {
        getMyStatistics,
        cashOut,
        createCode,
    };
};

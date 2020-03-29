import { getSumInUSD } from 'src/helpers/system';
import { WITHDRAW_CREATED_QIWI, WITHDRAW_ERROR_DATA_QIWI } from 'shared/configs/notificationsTypes';

export default ({ app }) => {
    const { store, api } = app.modules;
    const { domains, actions } = store;
    const { services } = api;

    const redirectToFreekassa = ({ amount }) => async (dispatch) => {
        dispatch(actions.cashier.startLoading());
        services.payment.execute('getFreekassaUrl', {
            body: {
                amount: getSumInUSD(amount),
            },
        })
            .then((response) => {
                window.open(response.url);
            })
            .catch((e) => {
                throw new Error(e);
            })
            .finally(() => {
                dispatch(actions.cashier.stopLoading());
            });
    };

    const createQiwiWithdraw = ({ amount, phone }) => async (dispatch) => {
        if (phone[0] === '+') {
            dispatch(actions.user.addNotification({ type: WITHDRAW_ERROR_DATA_QIWI }));
            return;
        }

        dispatch(actions.cashier.startLoading());

        services.withdraw.execute('create', {
            body: {
                amount,
                phone,
            },
        })
            .then((withdraw) => {
                console.log('Вывод', withdraw, 'успешно создан');
                dispatch(actions.user.addNotification({ type: WITHDRAW_CREATED_QIWI }));
            })
            .catch(e => {
                console.log('Во время создания вывода произошла ошибка', e);
            })
            .finally(() => {
                dispatch(actions.cashier.stopLoading());
            })
    };

    return {
        redirectToFreekassa,
        createQiwiWithdraw,
    };
};

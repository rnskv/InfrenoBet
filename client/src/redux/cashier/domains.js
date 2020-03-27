import { getSumInUSD } from 'src/helpers/system';

export default ({ app }) => {
    const { store, api } = app.modules;
    const { domains, actions } = store;

    const redirectToFreekassa = ({ amount }) => async (dispatch) => {
        dispatch(actions.cashier.startLoading());
        api.services.payment.execute('getFreekassaUrl', {
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

    return {
        redirectToFreekassa,
    };
};

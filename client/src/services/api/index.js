import { Api, Request } from 'shared/api';
import { USER_NOT_FOUND } from 'shared/configs/notificationsTypes';

import Cookies from 'js-cookie';
import { moveReferralCodeToCookies } from 'src/helpers/system';
import createWithdrawApi from './withdraw';
import createTradeOffersApi from './tradeoffers';
import createReferralsApi from './referrals';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app }) => {
    const {
        store,
    } = app.modules;

    const {
        actions,
        domains,
    } = store;

    const params = new URLSearchParams(location.search);
    moveReferralCodeToCookies({ referralCode: params.get('r') });

    const errorDefaultHandler = ({ type }) => app.modules.store.dispatch(actions.user.addNotification({ type }));

    const withdrawApi = createWithdrawApi({ app, onError: errorDefaultHandler });
    const tradeOffersApi = createTradeOffersApi({ app, onError: errorDefaultHandler });
    const referralsApi = createReferralsApi({ app, onError: errorDefaultHandler });

    const paymentApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/payment`,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.getState().user.token,
        },
        onError: errorDefaultHandler,
    });

    const itemsApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/items`,
        headers: {
            'Content-Type': 'application/json',
        },
        onError: errorDefaultHandler,
    });

    const authApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/auth`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            cookies: Cookies.get(),
        },
        onError: errorDefaultHandler,
    });

    const usersApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/users`,
        headers: {
            'Content-Type': 'application/json',
        },
        onError: ({ type }) => {
            app.modules.store.dispatch(actions.user.addNotification({ type }));

            if (type === USER_NOT_FOUND) {
                app.modules.store.dispatch(domains.user.logOut());
            }
        },
    });

    const rootApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/root`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const gamesApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/games`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    itemsApi.addRequests({
        getAll: new Request({
            url: '/',
            method: 'get',
        }),
        parse: new Request({
            url: '/parse',
            method: 'post',
        }),
    });

    authApi.addRequests({
        logIn: new Request({
            url: '/login',
            method: 'post',
        }),
        logUp: new Request({
            url: '/register',
            method: 'post',
        }),
    });

    usersApi.addRequests({
        getProfile: new Request({
            url: '/me',
            method: 'get',
        }),
        updateSteamTradeLink: new Request({
            url: '/steam/url',
            method: 'put',
        }),
        getInventory: new Request({
            url: '/steam/inventory',
            method: 'get',
        }),
    });

    gamesApi.addRequests({
        getAll: new Request({
            url: '/',
            method: 'get',
        }),
        getLastFinished: new Request({
            url: '/last',
            method: 'get',
        }),
        getLucky: new Request({
            url: '/lucky',
            method: 'get',
        }),
        getGreatest: new Request({
            url: '/greatest',
            method: 'get',
        }),
    });


    rootApi.addRequests({
        test: new Request({
            url: '/',
            method: 'get',
        }),
    });

    paymentApi.addRequests({
        getAllFreekassaPayments: new Request({
            url: '/freekassa',
            method: 'get',
        }),
        getFreekassaUrl: new Request({
            url: '/freekassa/redirect',
            method: 'post',
        }),
        getMyDeposits: new Request({
            url: '/deposits/my',
            method: 'get',
        }),
    });

    return {
        root: rootApi,
        user: usersApi,
        games: gamesApi,
        auth: authApi,
        items: itemsApi,
        payment: paymentApi,
        withdraw: withdrawApi,
        tradeOffers: tradeOffersApi,
        referrals: referralsApi,
    };
};

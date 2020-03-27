import { Api, Request } from 'shared/api';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app }) => {
    const {
        store,
    } = app.modules;

    console.log(app.modules, store);

    const {
        actions,
        domains,
    } = store;

    const paymentApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/payment`,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.getState().user.token,
        },
        onError: ({ type }) => store.dispatch(actions.user.addNotification({ type })),
    });

    const itemsApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/items`,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.getState().user.token,
        },
        onError: ({ type }) => store.dispatch(actions.user.addNotification({ type })),
    });

    const authApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/auth`,
        headers: {
            'Content-Type': 'application/json',
        },
        onError: ({ type }) => {
            console.log(app);
            store.dispatch(actions.user.addNotification({ type }));
        },
    });

    const usersApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/users`,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.getState().user.token,
        },
        onError: ({ type }) => dispatch(actions.user.addNotification({ type })),
    });

    const rootApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/root`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const gameApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/game`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    itemsApi.addRequests({
        getAll: new Request({
            url: '/',
            method: 'get',
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
    });

    rootApi.addRequests({
        test: new Request({
            url: '/',
            method: 'get',
        }),
    });

    paymentApi.addRequests({
        getFreekassaUrl: new Request({
            url: '/freekassa/redirect',
            method: 'post',
        }),
    });

    window.test = paymentApi;
    return {
        root: rootApi,
        user: usersApi,
        game: gameApi,
        auth: authApi,
        items: itemsApi,
        payment: paymentApi,
    };
};

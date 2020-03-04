import { Api, Request } from 'shared/api';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app }) => {
    const { store, dispatch, getState, actions } = app;

    const authApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/auth`,
        headers: {
            'Content-Type': 'application/json'
        },
        onError: ({ type }) => {
            dispatch(actions.user.addNotification({ type }))
        },
    });

    const usersApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/users`,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: store.getState().user.token,
        },
        // onError: ({ type }) => store.dispatch(actions.user.addNotification({ type })),
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

    const rootApi = new Api({
        url: 'http://localhost:2020/api/root',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    rootApi.addRequests({
        test: new Request({
            url: '/',
            method: 'get',
        }),
    });

    const gameApi = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/game`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return {
        root: rootApi,
        user: usersApi,
        game: gameApi,
        auth: authApi,
    };
};

import { Api, Request } from 'shared/api';
import { store, actions } from '../index';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export const authApi = new Api({
    url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
    onError: (error) => store.dispatch(actions.user.addNotification({ notification: error })),
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

import { Api, Request } from 'src/modules/api';

export const authApi = new Api({
    url: 'localhost:2020/api/auth',
    headers: {
        token: '333',
    },
});

authApi.addRequests({
    logIn: new Request({
        url: '/login',
        method: 'post',
        headers: {
            // token: '123'
        },
    }),
});

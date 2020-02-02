import { Api, Request } from 'src/modules/api';

export const authApi = new Api({
    url: 'http://localhost:2020/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.addRequests({
    logIn: new Request({
        url: '/login',
        method: 'post',
        body: {
            email: 'web.rnskv@gmail.com',
            password: 'qwerty'
        },
    }),
});

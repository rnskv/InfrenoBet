import { Api, Request } from 'shared/api';

export const userApi = new Api({
    url: `$http://localhost:3000/api/users`,
    headers: {
        'Content-Type': 'application/json',
    },
});

userApi.addRequests({
    me: new Request({
        url: '/me',
        method: 'get',
    }),
    users: new Request({
        url: '/',
        method: 'get',
    })
});

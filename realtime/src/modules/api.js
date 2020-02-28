import { Api, Request } from 'shared/api';
import { connection } from 'src/app';
import config from 'src/config';

export const userApi = new Api({
    url: `http://${config.server_host}:${config.server_port}/api/users`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const gameApi = new Api({
    url: `http://${config.server_host}:${config.server_port}/api/games`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const transactionsApi = new Api({
    url: `http://${config.server_host}:${config.server_port}/api/transactions`,
    headers: {
        'Content-Type': 'application/json',
    }
});

userApi.addRequests({
    me: new Request({
        url: '/me',
        method: 'get',
    }),
    users: new Request({
        url: '/',
        method: 'get',
    }),
    changeBalance: new Request({
        url: '/changeBalance',
        method: 'put',
    })
});

gameApi.addRequests({
    create: new Request({
        url: '/',
        method: 'post',
    }),
    getWinnerById: new Request({
        url: '/winner',
        method: 'post'
    }),
    finish: new Request({
        url: '/finish',
        method: 'post'
    })
});

transactionsApi.addRequests({
    create: new Request({
        url: '/',
        method: 'post',
    })
});

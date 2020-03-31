import { Api, Request } from 'shared/api';
import { connection } from 'src/app';
import config from 'src/config';

export const itemsApi = new Api({
    url: `http://${config.server_host}:${config.server_port}/api/items`,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const betsApi = new Api({
    url: `http://${config.server_host}:${config.server_port}/api/bets`,
    headers: {
        'Content-Type': 'application/json',
    }
});

itemsApi.addRequests({
    getAll: new Request({
        url: '/',
        method: 'get',
    }),
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
    }),
    addInventory: new Request({
        url: '/inventory',
        method: 'put'
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

betsApi.addRequests({
    create: new Request({
        url: '/',
        method: 'post',
    })
});

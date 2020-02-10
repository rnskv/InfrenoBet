import { Api, Request } from 'shared/api';

export const userApi = new Api({
    url: `http://localhost:2020/api/users`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const gameApi = new Api({
    url: `http://localhost:2020/api/games`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const transactionsApi = new Api({
    url: `http://localhost:2020/api/transactions`,
    headers: {
        'Content-Type': 'application/json',
    },
    onError: (err) => {
        console.log('onError', err)
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

import { Api, Request } from 'src/modules/api';

export const rootApi = new Api({
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

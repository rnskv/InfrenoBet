import { Api, Request } from 'shared/api';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app, onError }) => {
    const withdraw = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/withdraw`,
        headers: {
            'Content-Type': 'application/json',
        },
        onError,
    });

    withdraw.addRequests({
        create: new Request({
            url: '/',
            method: 'post',
        }),
        getAll: new Request({
            url: '/',
            method: 'get',
        }),
        getMy: new Request({
            url: '/my',
            method: 'get',
        }),
        createSwiftPayout: new Request({
            url: '/swift/payout',
            method: 'post',
        }),
    });

    return withdraw;
};

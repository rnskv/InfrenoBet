import { Api, Request } from 'shared/api';
import Cookies from 'js-cookie';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app, onError }) => {
    const referrals = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/referrals`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            cookies: Cookies.get(),
        },
        onError,
    });

    referrals.addRequests({
        connect: new Request({
            url: '/connect',
            method: 'post',
        }),
        getMyStatistics: new Request({
            url: '/my',
            method: 'get',
        }),
        connectByCode: new Request({
            url: '/connect/code',
            method: 'post',
        }),
        cashOut: new Request({
            url: '/cashout',
            method: 'post',
        }),
        createCode: new Request({
            url: '/code',
            method: 'post',
        }),
    });

    return referrals;
};

import { Api, Request } from 'shared/api';
import Cookies from 'js-cookie';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app, onError }) => {
    const statistics = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/statistics`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            cookies: Cookies.get(),
        },
        onError,
    });

    statistics.addRequests({
        getAll: new Request({
            url: '/all',
            method: 'get',
        }),
    });

    return statistics;
};

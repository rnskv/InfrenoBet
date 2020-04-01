import { Api, Request } from 'shared/api';

const { SERVER_PROTOCOL, SERVER_PORT, SERVER_HOST } = process.env;

export default ({ app, onError }) => {
    const tradeoffers = new Api({
        url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/tradeoffers`,
        headers: {
            'Content-Type': 'application/json',
        },
        onError,
    });

    tradeoffers.addRequests({
        create: new Request({
            url: '/',
            method: 'post',
        }),
        getAll: new Request({
            url: '/',
            method: 'get',
        }),
    });

    return tradeoffers;
};

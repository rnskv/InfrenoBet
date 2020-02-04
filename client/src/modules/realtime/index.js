import Socket from 'src/modules/sockets';

const { REALTIME_PROTOCOL, REALTIME_PORT, REALTIME_HOST } = process.env;

export const ws = new Socket({
    url: `${REALTIME_PROTOCOL}://${REALTIME_HOST}:${REALTIME_PORT}`,
});

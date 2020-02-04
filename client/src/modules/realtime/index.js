import Socket from 'src/modules/sockets';

export const ws = new Socket({
    url: 'http://localhost:3000',
});

ws.io.on('connection', () => {
    console.log('connect');
});

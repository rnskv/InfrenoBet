import Socket from 'src/modules/sockets';

console.log('123', process.env)
export const ws = new Socket({
    url: 'http://localhost:3000',
});

ws.io.on('connection', () => {
    console.log('connect');
});

import Action from 'src/core/Action';

export const root = new Action({
    method: 'get',
    url: '/',
    callback: async (ctx) => {
        console.log('callback');
        ctx.status = 200;
        ctx.body = 'Hello from action';
    },
});

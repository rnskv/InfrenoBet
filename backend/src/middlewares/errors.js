export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            type: err.type || 'INTERNAL_SERVER_ERROR',
        };
    }
};

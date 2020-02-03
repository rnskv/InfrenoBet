export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            error: err.message || 'Internal Server Error',
        };
    }
};

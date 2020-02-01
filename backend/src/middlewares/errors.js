export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500 || err.status;
        ctx.body = {
            error: err.message || 'Internal Server Error',
        };
    }
};

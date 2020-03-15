import notifications from 'shared/configs/notifications';

export default async (ctx = {}, next) => {
    try {
        await next();
    } catch (error) {
        const notification = notifications[error.type] || {};

        ctx.status = notification.status || 500;
        ctx.body = {
            isError: true,
            type: error.type
        };
    }
};

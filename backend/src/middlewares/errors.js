import notifications from 'shared/configs/notifications';
import { INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';

export default async (ctx = {}, next) => {
    try {
        await next();
    } catch (error) {
        const notification = notifications[error.type] || {};
        console.log('Error wwa handled, ', error)
        ctx.status = notification.status || 500;
        ctx.body = {
            isError: true,
            type: error.type || INTERNAL_SERVER_ERROR,
            message: error.toString() || ''
        };
    }
};

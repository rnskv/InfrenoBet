import notifications from 'shared/configs/notifications';
import { INTERNAL_SERVER_ERROR } from 'shared/configs/notificationsTypes';

export default async (ctx = {}, next) => {
    const user = ctx.state.user;
    console.log('Check access middleware', user);
    await next(ctx);
};

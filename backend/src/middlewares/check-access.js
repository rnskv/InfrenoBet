import notifications from 'shared/configs/notifications';
import { USER_NOT_ENOUGHT_ACCESS_RIGHT } from 'shared/configs/notificationsTypes';

export default ({ accessLevel }) => async (ctx = {}, next) => {
    const user = ctx.state.user;
    if (user.accessLevel < accessLevel) {
        ctx.throw({ type: USER_NOT_ENOUGHT_ACCESS_RIGHT });
    }
    await next(ctx);
};

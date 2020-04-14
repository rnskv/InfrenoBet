import notifications from 'shared/configs/notifications';
import { USER_NOT_ENOUGHT_ACCESS_RIGHT } from 'shared/configs/notificationsTypes';

export default ({ accessLevel }) => async (ctx = {}, next) => {
    const user = ctx.state.user;
    console.log('Access checking....');
    console.log(`User with access level ${user.accessLevel} make request with access level ${accessLevel}`);
    if (user.accessLevel < accessLevel) {
        ctx.throw({ type: USER_NOT_ENOUGHT_ACCESS_RIGHT });
        return;
    }
    await next(ctx);
};

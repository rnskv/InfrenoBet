import Cookies from 'js-cookie';
import { USER_SUCCESS_REGISTER } from 'shared/configs/notificationsTypes';
import { logInProccesing } from 'src/helpers/system';
import { infernoClient } from 'src/index';

export default ({ app }) => {
    const { api, store, realtime } = app.modules;
    const { actions, domains } = store;

    const getProfile = () => async (dispatch) => {
        // @todo вынести в геттер апи isAut или что то такое

        if (!api.services.user.headers.Authorization) {
            return;
        }

        const { profile } = await api.services.user.execute('getProfile');
        console.log('setProfile')
        dispatch(actions.user.setProfile({ profile }));
    };


    const logUp = ({ email, name, password }) => async (dispatch) => {
        dispatch(actions.user.loading());
        await api.services.auth.execute('logUp', {
            body: {
                email,
                password,
                name,
            },
        }).then(() => {
            dispatch(actions.user.register());
            dispatch(actions.user.addNotification({ type: USER_SUCCESS_REGISTER }));
        }).catch(() => {
            dispatch(actions.user.error());
        });
    };

    const logIn = ({ email, password }) => async (dispatch) => {
        dispatch(actions.user.loading());

        api.services.auth.execute('logIn', {
            body: {
                email,
                password,
            },
        }).then((response) => {
            if (response.token) {
                Cookies.set('token', response.token);

                logInProccesing({ app });

                dispatch(getProfile());
            } else {
                dispatch(actions.user.error());
            }
        }).catch(() => {
            dispatch(actions.user.error());
        });
    };

    const logOut = () => (dispatch) => {
        Cookies.remove('token');
        api.services.user.setHeader('Authorization', null);
        dispatch(actions.user.logOut());
        realtime.io.emit('project.logOut');
    };

    return {
        getProfile,
        logOut,
        logUp,
        logIn,
    };
};

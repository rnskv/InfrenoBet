import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';

import * as actions from './actions';
import { authApi, usersApi } from './api';

export const logUp = ({ email, name, password }) => async (dispatch) => {
    dispatch(actions.loading());

    const response = await authApi.execute('logUp', {
        body: {
            email,
            password,
            name,
        },
    });

    if (response.ok) {
        dispatch(actions.register());
    } else {
        dispatch(actions.error({ logupError: response.error }));
    }
};

export const logIn = ({ email, password }) => async (dispatch) => {
    dispatch(actions.loading());

    const response = await authApi.execute('logIn', {
        body: {
            email,
            password,
        },
    });

    if (response.token) {
        window.localStorage.setItem('token', response.token);
        dispatch(actions.logIn({ token: response.token }));
        ws.io.emit('project.auth', response.token);
    } else {
        dispatch(actions.error({ loginError: response.error }));
    }
};

export const getProfile = () => async (dispatch) => {
    const { profile } = await usersApi.execute('getProfile');

    dispatch(actions.setProfile({ profile }));
};

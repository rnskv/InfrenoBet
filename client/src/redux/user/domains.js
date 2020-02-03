import * as actions from './actions';
import { authApi } from './api';
import history from 'src/modules/router/history';

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
    } else {
        dispatch(actions.error({ loginError: response.error }));
    }
};

export const test = () => async (dispatch) => {
    const response = await authApi.execute('logIn', {
        body: {
            email: 'web.rnskv@gmail.com',
            password: 'qwerty',
        },
    });

    console.log(response);

    dispatch(actions.logIn());

    setTimeout(dispatch, 1000, actions.logOut());
    setTimeout(dispatch, 2000, actions.register());
};

import * as actions from './actions';
import { authApi } from './api';

export const logIn = ({ email, password }) => async (dispatch) => {
    const response = await authApi.execute('logIn', {
        body: {
            email,
            password
        },
    });

    if (response.token) {
        dispatch(actions.logIn({ token: response.token }))
    } else {
        alert(response.error)
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

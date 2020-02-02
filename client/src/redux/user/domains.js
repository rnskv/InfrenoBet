import * as actions from './actions';
import { authApi } from './api';

export const test = () => (dispatch) => {

    authApi.execute('logIn', {
        headers: {
            // token: '555'
        }
    });

    dispatch(actions.logIn());

    setTimeout(dispatch, 1000, actions.logOut());
    setTimeout(dispatch, 2000, actions.register());
};

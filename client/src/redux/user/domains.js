import * as actions from './actions';
import { authApi } from './api';

export const test = () => async (dispatch) => {

    const response = await authApi.execute('logIn', {});

    console.log(response);

    dispatch(actions.logIn());

    setTimeout(dispatch, 1000, actions.logOut());
    setTimeout(dispatch, 2000, actions.register());
};

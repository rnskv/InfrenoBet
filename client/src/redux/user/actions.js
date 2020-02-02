import * as actionTypes from './actionsTypes';

export const logIn = (payload) => ({
    type: actionTypes.LOGIN_USER,
    payload,
});

export const logOut = (payload) => ({
    type: actionTypes.LOGOUT_USER,
    payload,
});

export const register = (payload) => ({
    type: actionTypes.REGISTER_USER,
    payload,
});

export const test = () => (dispatch) => {
    dispatch(logIn());

    setTimeout(dispatch, 1000, logOut());
    setTimeout(dispatch, 2000, register());
};

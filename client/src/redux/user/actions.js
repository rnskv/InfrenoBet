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

export const error = (payload) => ({
    type: actionTypes.ERROR_USER,
    payload,
});

export const loading = () => ({
    type: actionTypes.LOADING_USER
});

export const reset = () => ({
    type: actionTypes.RESET_USER
});

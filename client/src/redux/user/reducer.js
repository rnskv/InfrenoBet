import * as actionTypes from './actionsTypes';
import { ws } from 'src/modules/realtime';

const getClearState = () => ({
    isLoading: false,
    isRegister: false,
    loginError: '',
    logupError: '',
});

const initialState = {
    token: window.localStorage.getItem('token') || '',
    ...getClearState(),
};

//@todo remove later
if (initialState.token) {
    ws.io.emit('project.auth', initialState.token);
}

function userReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.LOADING_USER: {
        return {
            ...state,
            isLoading: true,
            error: '',
            notifications: [],
        };
    }

    case actionTypes.ERROR_USER: {
        return {
            ...state,
            isLoading: false,
            ...action.payload,
        };
    }

    case actionTypes.LOGIN_USER: {
        return {
            ...state,
            isLoading: false,
            ...action.payload,
        };
    }

    case actionTypes.LOGOUT_USER: {
        return {
            ...state,
            token: '',
            isLoading: false,
        };
    }

    case actionTypes.REGISTER_USER: {
        return {
            ...state,
            isLoading: false,
            isRegister: true,
        };
    }

    case actionTypes.RESET_USER: {
        return {
            ...state,
            ...getClearState(),
        };
    }

    case actionTypes.ADD_NOTIFICATION: {
        console.log('_actionTypes.ADD_NOTIFICATION', action);
        return {
            ...state,
            notifications: [...state.notifications, action.payload.notification],
        };
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default userReducer;

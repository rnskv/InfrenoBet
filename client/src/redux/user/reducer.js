import { ws } from 'src/modules/realtime';
import * as actionTypes from './actionsTypes';

const getClearState = () => ({
    isLoading: false,
    isRegister: false,
    loginError: '',
    logupError: '',
    notifications: [],
});

const initialState = {
    token: window.localStorage.getItem('token') || '',
    profile: {
        isLoading: true,
    },
    ...getClearState(),
};

// @todo remove later
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

    case actionTypes.SET_PROFILE: {
        return {
            ...state,
            profile: {
                ...state.profile,
                ...action.payload.profile,
                isLoading: false,
            },
        };
    }

    case actionTypes.CHANGE_BALANCE_USER: {
        return {
            ...state,
            profile: {
                ...state.profile,
                balance: state.profile.balance + action.payload.amount,
            },
        };
    }

    case actionTypes.ADD_NOTIFICATION: {
        return {
            ...state,
            notifications: [action.payload.notification, ...state.notifications],
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

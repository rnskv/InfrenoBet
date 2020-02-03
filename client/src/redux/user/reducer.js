import * as actionTypes from './actionsTypes';

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
            ...action.payload
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

    default: {
        return {
            ...state,
        };
    }
    }
}

export default userReducer;

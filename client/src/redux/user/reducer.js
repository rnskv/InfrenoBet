import * as actionTypes from './actionsTypes';

const initialState = {
    name: 'Roma',
    token: '',
    isLoading: false,
    error: '',
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
            error: action.payload.error,
        };
    }

    case actionTypes.LOGIN_USER: {
        return {
            ...state,
            token: action.payload.token,
            isLoading: false,
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

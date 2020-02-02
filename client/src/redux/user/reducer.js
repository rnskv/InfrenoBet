import * as actionTypes from './actionsTypes';

const initialState = {
    name: 'Roma',
    token: null,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.LOGIN_USER: {
        return {
            ...state,
            token: 'login',
        };
    }

    case actionTypes.LOGOUT_USER: {
        return {
            ...state,
            token: 'logout',
        };
    }

    case actionTypes.REGISTER_USER: {
        return {
            ...state,
            token: 'register',
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

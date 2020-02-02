import * as actionTypes from './actionsTypes';

const initialState = {
    name: 'Roma',
    token: '',
};

function userReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.LOGIN_USER: {
        return {
            ...state,
            token: action.payload.token,
        };
    }

    case actionTypes.LOGOUT_USER: {
        return {
            ...state,
            token: '',
        };
    }

    case actionTypes.REGISTER_USER: {
        return {
            ...state,
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

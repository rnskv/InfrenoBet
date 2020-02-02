import * as actionTypes from './actionsTypes';

const initialState = {
    name: 'Roma',
    token: null,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.LOGIN_USER: {
        console.log(action)
        return {
            ...state,
            token: action.payload.token,
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

import * as actionTypes from './actionsTypes';

const initialState = {
    token: window.localStorage.getItem('token') || '',
    transactions: [],
    users: [],
};

function gameReducer(state = initialState, action) {
    switch (action.type) {

    case actionTypes.GAME_JOIN: {
        console.log('loool')
        return {
            ...state,
            users: [...state.users, action.payload.user]
        }
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default gameReducer;

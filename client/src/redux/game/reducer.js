import * as actionTypes from './actionsTypes';

const initialState = {
    token: window.localStorage.getItem('token') || '',

};

function gameReducer(state = initialState, action) {
    switch (action.type) {

    default: {
        return {
            ...state,
        };
    }
    }
}

export default gameReducer;

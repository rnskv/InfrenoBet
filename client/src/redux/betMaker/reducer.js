import { ws } from 'src/modules/realtime';
import * as actionTypes from './actionsTypes';
import { OPEN_BET_MAKER } from './actionsTypes';

const initialState = {
    isOpened: false,
    userValues: [],
    allValues: [1, 5, 10, 50, 100, 500, 1000, 5000],
};

function betMakerReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.ADD_BET_IN_BET_MAKER: {
        console.log('onItemClick');
        return {
            ...state,
            userValues: [...state.userValues, action.payload.value],
        };
    }

    case actionTypes.REMOVE_BET_FROM_BET_MAKER: {
        console.log('onItemClick', action.payload, state.userValues);
        const copy = [...state.userValues];
        copy.splice(action.payload.index, 1);
        return {
            ...state,
            userValues: copy,
        };
    }

    case actionTypes.OPEN_BET_MAKER: {
        return {
            ...state,
            isOpened: true,
        };
    }

    case actionTypes.CLOSE_BET_MAKER: {
        return {
            ...state,
            isOpened: false,
        };
    }

    default: {
        return {
            ...state,
        };
    }
    }
}

export default betMakerReducer;

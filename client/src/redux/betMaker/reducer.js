import { ws } from 'src/modules/realtime';
import * as actionTypes from './actionsTypes';
import { OPEN_BET_MAKER } from './actionsTypes';

const initialState = {
    isOpened: false,
    userValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    allValues: [1, 5, 10, 50, 100, 500, 1000, 5000],
};

function betMakerReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.OPEN_BET_MAKER: {
        console.log('OPEN')
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

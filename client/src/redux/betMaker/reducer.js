import * as actionTypes from './actionsTypes';

const initialState = {
    isOpened: false,
    userValues: [],
    allValues: [1, 5, 10, 50, 100, 500, 1000, 5000],
};

function betMakerReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.ADD_BET_IN_BET_MAKER: {
        if (state.userValues.length >= 8) {
            return {
                ...state,
            };
        }
        return {
            ...state,
            userValues: [...state.userValues, action.payload.value],
        };
    }

    case actionTypes.REMOVE_BET_FROM_BET_MAKER: {
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
            userValues: [],
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

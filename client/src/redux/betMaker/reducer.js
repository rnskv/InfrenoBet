import * as actionTypes from './actionsTypes';

const initialState = {
    isOpened: false,
    userItems: [],
    items: [],
};

function betMakerReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.ADD_ITEM_IN_BET_MAKER: {
        if (state.userItems.length >= 8) {
            return {
                ...state,
            };
        }
        return {
            ...state,
            userItems: [...state.userItems, action.payload.item],
        };
    }

    case actionTypes.REMOVE_ITEM_FROM_BET_MAKER: {
        const copy = [...state.userItems];
        copy.splice(action.payload.index, 1);
        return {
            ...state,
            userItems: copy,
        };
    }

    case actionTypes.OPEN_BET_MAKER: {
        return {
            ...state,
            userItems: [],
            isOpened: true,
        };
    }

    case actionTypes.CLOSE_BET_MAKER: {
        return {
            ...state,
            isOpened: false,
        };
    }

    case actionTypes.BET_MAKER_ADD_ITEMS: {
        return {
            ...state,
            items: [...action.payload.items, ...state.items],
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

import Cookies from 'js-cookie';
import * as actionTypes from './actionsTypes';

const getClearState = () => ({
    notifications: [],
    isOpenedLoginPopup: false,
    isOpenedSteamInventory: false,
    isRegister: false,
});

const initialState = {
    token: Cookies.get('token') || '',
    profile: {
        isLoading: true,
        balance: 0,
    },
    sidebars: {
        left: {
            isOpened: false,
        },
        right: {
            isOpened: true,
        },
    },
    activeSidebarTabName: 'NOTIFICATIONS',
    ...getClearState(),
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
        };
    }

    case actionTypes.LOGIN_USER: {
        return {
            ...state,
            isLoading: false,
            token: Cookies.get('token'),
            ...action.payload,
        };
    }

    case actionTypes.LOGOUT_USER: {
        return {
            ...state,
            token: '',
            isLoading: false,
            profile: {
                ...initialState.profile,
            },
        };
    }

    case actionTypes.REGISTER_USER: {
        return {
            ...state,
            isLoading: false,
            isRegister: true,
        };
    }

    case actionTypes.RESET_USER: {
        return {
            ...state,
            ...getClearState(),
        };
    }

    case actionTypes.SET_PROFILE: {
        return {
            ...state,
            profile: {
                ...state.profile,
                ...action.payload.profile,
                isLoading: false,
            },
        };
    }

    case actionTypes.CHANGE_BALANCE_USER: {
        if (state.profile.balance + action.payload.amount < 0) {
            return {
                ...state,
            };
        }

        return {
            ...state,
            profile: {
                ...state.profile,
                balance: state.profile.balance + action.payload.amount,
            },
        };
    }

    case actionTypes.ADD_NOTIFICATION: {
        const notification = {
            id: state.notifications.length,
            ...action.payload.notification,
        };

        return {
            ...state,
            notifications: [notification, ...state.notifications],
        };
    }

    case actionTypes.REMOVE_ALL_NOTIFICATIONS: {
        return {
            ...state,
            notifications: [],
        };
    }

    case actionTypes.OPEN_SIDEBAR: {
        return {
            ...state,
            sidebars: {
                ...state.sidebars,
                [action.payload.side]: {
                    ...state.sidebars[action.payload.side],
                    isOpened: true,
                },
            },
        };
    }

    case actionTypes.CLOSE_SIDEBAR: {
        return {
            ...state,
            sidebars: {
                ...state.sidebars,
                [action.payload.side]: {
                    ...state.sidebars[action.payload.side],
                    isOpened: false,
                },
            },
        };
    }

    case actionTypes.OPEN_STEAM_INVENTORY: {
        return {
            ...state,
            isOpenedSteamInventory: true,
        };
    }

    case actionTypes.CLOSE_STEAM_INVENTORY: {
        return {
            ...state,
            isOpenedSteamInventory: false,
        };
    }

    case actionTypes.OPEN_LOGIN_POPUP: {
        return {
            ...state,
            isOpenedLoginPopup: true,
        };
    }

    case actionTypes.CLOSE_LOGIN_POPUP: {
        return {
            ...state,
            isOpenedLoginPopup: false,
        };
    }

    case actionTypes.CHANGE_SIDEBAR_TAB: {
        return {
            ...state,
            activeSidebarTabName: action.payload.name,
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

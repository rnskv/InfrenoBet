import NOTIFICATIONS from 'shared/configs/notifications';
import * as actionTypes from './actionsTypes';

export const getInfo = () => ({
    type: actionTypes.GET_INFO_USER,
});

export const logIn = (payload) => ({
    type: actionTypes.LOGIN_USER,
    payload,
});

export const logOut = (payload) => ({
    type: actionTypes.LOGOUT_USER,
    payload,
});

export const register = (payload) => ({
    type: actionTypes.REGISTER_USER,
    payload,
});

export const error = (payload) => ({
    type: actionTypes.ERROR_USER,
    payload,
});

export const loading = () => ({
    type: actionTypes.LOADING_USER,
});

export const reset = () => ({
    type: actionTypes.RESET_USER,
});

export const addNotification = ({ type, params = {} }) => {
    const notification = {
        ...NOTIFICATIONS[type],
        date: Date.now(),
        ...params,
    };

    return ({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { notification },
    });
};

export const removeAllNotifications = () => ({
    type: actionTypes.REMOVE_ALL_NOTIFICATIONS,
});

export const setProfile = (payload) => ({
    type: actionTypes.SET_PROFILE,
    payload,
});

export const changeBalance = (payload) => ({
    type: actionTypes.CHANGE_BALANCE_USER,
    payload,
});

export const openSidebar = (payload) => ({
    type: actionTypes.OPEN_SIDEBAR,
    payload,
});

export const closeSidebar = (payload) => ({
    type: actionTypes.CLOSE_SIDEBAR,
    payload,
});

export const openLoginPopup = () => ({
    type: actionTypes.OPEN_LOGIN_POPUP,
});


export const closeLoginPopup = () => ({
    type: actionTypes.CLOSE_LOGIN_POPUP,
});

export const openSteamInventory = () => ({
    type: actionTypes.OPEN_STEAM_INVENTORY,
});

export const closeSteamInventory = () => ({
    type: actionTypes.CLOSE_STEAM_INVENTORY,
});

export const changeSidebarTab = (payload) => ({
    type: actionTypes.CHANGE_SIDEBAR_TAB,
    payload,
});

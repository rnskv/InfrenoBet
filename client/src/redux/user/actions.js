import * as actionTypes from './actionsTypes';

const NOTIFICATIONS = {
    USER_ALREAY_EXIST: {
        title: 'Система',
        text: 'Пользователь с таким именем уже существует.',
    },
    USER_WRONG_PASSWORD: {
        title: 'Система',
        text: 'Вы ввели неверный пароль.',
    },
    USER_NOT_FOUND: {
        title: 'Система',
        text: 'Пользователь с таким именем не найден',
    },
    USER_NOT_ENOUGH_MONEY: {
        title: 'Игра',
        text: 'У вас недостаточно средств. Пожалуйста, пополните ваш баланс',
    },
    INTERNAL_SERVER_ERROR: {
        title: 'Система',
        text: 'Произошел сбой на сервере. Пожалуйста, повторите попытку позже.',
    },
};

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

export const addNotification = (payload) => {
    const notification = NOTIFICATIONS[payload.notification.type];

    return ({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { notification },
    });
}

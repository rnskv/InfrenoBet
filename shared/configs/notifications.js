import {
    USER_ALREAY_EXIST,
    USER_WRONG_PASSWORD,
    USER_NOT_FOUND,
    USER_NOT_ENOUGH_MONEY,
    INTERNAL_SERVER_ERROR,
    TRANSACTION_SENDING,

} from './notificationsTypes';

export default {
    [USER_ALREAY_EXIST]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Пользователь с таким именем уже существует.',
    },
    [USER_WRONG_PASSWORD]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Пользователь с таким именем не найден',
    },
    [USER_NOT_FOUND]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Пользователь с таким именем уже существует.',
    },
    [USER_NOT_ENOUGH_MONEY]: {
        type: 'ERROR',
        title: 'Игра',
        text: 'У вас недостаточно средств. Пожалуйста, пополните ваш баланс',
    },
    [INTERNAL_SERVER_ERROR]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Произошел сбой на сервере. Пожалуйста, повторите попытку позже.',
    },
    [TRANSACTION_SENDING]: {
        type: 'SUCCESS',
        title: 'Система',
        text: 'Ваша транзакция успешно поставлена в очередь! Она будет добавлена в игру в течении ~5 сек.',
    }
}
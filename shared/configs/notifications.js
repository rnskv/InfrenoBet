import {
    USER_ALREADY_EXIST,
    USER_WRONG_PASSWORD,
    USER_NOT_FOUND,
    USER_NOT_ENOUGH_MONEY,
    USER_WRONG_REGISTER_DATA,
    USER_NOT_SELECT_ITEMS,
    USER_NOT_ENOUGHT_ACCESS_RIGHT,
    USER_SUCCESS_REGISTER,
    INTERNAL_SERVER_ERROR,
    BET_SENDING,
    USER_NOT_AUTH,
    GAME_CLOSED_FOR_BETS,
    BET_ACCEPTED,
    REALTIME_DISCONNECTED,
    USER_WIN,
    WAITING_LAST_BETS,
    SO_MANY_ITEMS,
    WITHDRAW_CREATED_QIWI,
    WITHDRAW_ERROR_DATA_QIWI,
    WITHDRAW_ERROR_MIN_AMOUNT,
} from './notificationsTypes';

export default {
    [USER_ALREADY_EXIST]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Пользователь с таким именем уже существует.',
    },
    [USER_WRONG_PASSWORD]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Вы ввели неверный пароль',
    },
    [USER_NOT_FOUND]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Пользователь с таким именем не найден.',
    },
    [USER_WRONG_REGISTER_DATA]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Вы ввели некорретные данные при регистрации.',
    },
    [USER_SUCCESS_REGISTER]: {
        type: 'SUCCESS',
        title: 'Система',
        text: 'Вы успешно зарегистрировались! Можете войти в игру используя свои данные.',
    },
    [USER_NOT_AUTH]: {
        type: 'ERROR',
        title: 'Ошибка доступа',
        text: 'Вы не авторизированы.',
    },
    [USER_NOT_ENOUGH_MONEY]: {
        type: 'ERROR',
        title: 'Игра',
        text: 'У вас недостаточно средств. Пожалуйста, пополните ваш баланс',
    },
    [USER_NOT_ENOUGHT_ACCESS_RIGHT]: {
        type: 'ERROR',
        title: 'Сервер',
        text: 'У вас недостаточно прав для выполнения запроса',
    },
    [USER_NOT_SELECT_ITEMS]: {
        type: 'ERROR',
        title: 'Игра',
        text: 'Вы не выбрали предметы для ставки.',
    },
    [USER_WIN]: {
        type: 'SUCCESS',
        title: 'Игра',
        text: 'Поздравляем! Вы одержали победу в игре. Выигрыш будет зачислен на ваш баланс в ближайшее время.',
    },
    [INTERNAL_SERVER_ERROR]: {
        type: 'ERROR',
        title: 'Система',
        text: 'Произошел сбой на сервере. Пожалуйста, повторите попытку позже.',
    },
    [GAME_CLOSED_FOR_BETS]: {
        type: 'ERROR',
        title: 'Игра',
        text: 'Ставки больше не принимаются. Игра скоро начнется"',
    },
    [BET_SENDING]: {
        type: 'SUCCESS',
        title: 'Игра',
        text: 'Ваша ставка находится в очереди! В скором времени она будет добавлена в игру.',
    },
    [BET_ACCEPTED]: {
        type: 'SUCCESS',
        title: 'Игра',
        text: 'Ваша ставка принята!',
    },
    [REALTIME_DISCONNECTED]: {
        type: 'ERROR',
        title: 'Сервер',
        text: 'На сервере возникли технические неполадки!',
    },
    [WAITING_LAST_BETS]: {
        type: 'SUCCESS',
        title: 'Игра',
        text: 'Игра начнется после того как будут обработаны последние ставки.',
    },
    [SO_MANY_ITEMS]: {
        type: 'ERROR',
        title: 'Игра',
        text: 'Максимальное количество предметов в игре - 10',
    },
    [WITHDRAW_CREATED_QIWI]: {
        type: 'SUCCESS',
        title: 'Платежная система',
        text: 'Вывод на систему QIWI успешно создан. Начисление средств произойдет в течении 24 часов.',
    },
    [WITHDRAW_ERROR_DATA_QIWI]: {
        type: 'ERROR',
        title: 'Платежная система',
        text: 'При создании вывода произошла ошибка. Не верно указаны платежные данные.',
    },
    [WITHDRAW_ERROR_MIN_AMOUNT]: {
        type: 'ERROR',
        title: 'Платежная система',
        text: 'При выводе средств, Вы указали сумму меньше минимальной.',
    },
    undefined: {
        type: 'ERROR',
        title: 'Клиент',
        text: 'Неизвестная ошибка!',
    }
}
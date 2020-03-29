import {
    SUCCESS, CREATED, ERROR
} from './sharedTypes';

export default {
    [SUCCESS]: {
        text: 'ЗАВЕРЕШНО'
    },
    [CREATED]: {
        text: 'В ПРОЦЕССЕ'
    },
    [ERROR]: {
        text: 'ВОЗНИКЛА ОШИБКА'
    }
}
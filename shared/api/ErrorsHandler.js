import {
    SERVER_ERROR,
    CLIENT_ERROR,
    REDIRECT_MESSAGE,
    SUCCESS_MESSAGE,
    INFORMATION_MESSAGE,
} from './CodesTypes';

export const checkResponseStatus = (status) => {
    if (status >= 500) {
        console.log(SERVER_ERROR);
        return false;
    }

    if (status >= 400) {
        console.log(CLIENT_ERROR);
        return true;
    }

    if (status >= 300) {
        console.log(REDIRECT_MESSAGE);
        return true;
    }

    if (status >= 200) {
        console.log(SUCCESS_MESSAGE);
        return true;
    }

    if (status >= 100) {
        console.log(INFORMATION_MESSAGE);
        return true;
    }
};

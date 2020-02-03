import {
    SERVER_ERROR,
    CLIENT_ERROR,
    REDIRECT_MESSAGE,
    SUCCESS_MESSAGE,
    INFORMATION_MESSAGE,
} from './CodesTypes';

export const checkResponseStatus = (status) => {
    if (status >= 500) {
        alert(SERVER_ERROR);
        return false;
    }

    if (status >= 400) {
        alert(CLIENT_ERROR);
        return true;
    }

    if (status >= 300) {
        alert(REDIRECT_MESSAGE);
        return true;
    }

    if (status >= 200) {
        alert(SUCCESS_MESSAGE);
        return true;
    }

    if (status >= 100) {
        alert(INFORMATION_MESSAGE);
        return true;
    }
};

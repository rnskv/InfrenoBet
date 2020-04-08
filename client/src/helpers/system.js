import crypto from 'crypto';
import moment from 'moment-timezone';
import Cookies from 'js-cookie';
import { infernoClient } from 'src/index';
import { exchange } from 'shared/configs/money';

export function getTimeFromNow(date) {
    moment.locale('ru');
    return moment.tz(date, 'Europe/Moscow').fromNow();
}

export function getUserColorsById(id) {
    const nicknameHash = crypto.createHash('md5')
        .update(String(id))
        .digest('hex');

    const lightColor = `#${nicknameHash.slice(0, 6)}59`;
    const darkColor = `#${nicknameHash.slice(0, 6)}db`;
    const defaultColor = `#${nicknameHash.slice(0, 6)}`;
    return {
        nicknameHash,
        lightColor,
        darkColor,
        defaultColor,
    };
}

export function getUserChances(user, bank) {
    return Number((bank.users[user._id] / bank.total * 100).toFixed(2));
}

export function getBetChances(bet, bank) {
    return Number(((bet.item.parent.cost) / (bank.total) * 100).toFixed(10));
}

export function getFormattedTime(time, { minutes = true, seconds = true } = {}) {
    const MM = Math.floor(time / 60);
    const SS = Math.floor(time % 60);

    if (!minutes) {
        return SS >= 10 ? SS : `0${SS}`;
    }

    if (!seconds) {
        return MM >= 10 ? MM : `0${MM}`;
    }

    return `${MM >= 10 ? MM : `0${MM}`} : ${SS >= 10 ? SS : `0${SS}`}`;
}

const currency = 'RUB';

const icon = {
    USD: '$',
    RUB: '₽',
    EUR: '€',
};

export const getSumInUSD = (sum) => sum * exchange[currency];

export const getExchangedSum = (dollarSum, { accuracy = 2, isNeedIcon = true } = {}) => {
    const exchangedSum = (dollarSum / exchange[currency]);
    const formattedExchangedSum = !(exchangedSum % 10)
        ? exchangedSum
        : (dollarSum / exchange[currency]).toFixed(accuracy);

    const currencyIcon = icon[currency];

    if (isNeedIcon) {
        return {
            EUR: `${formattedExchangedSum}${currencyIcon}`,
            RUB: `${formattedExchangedSum}${currencyIcon}`,
            USD: `${currencyIcon}${formattedExchangedSum}`,
        }[currency];
    }

    return {
        EUR: Number(formattedExchangedSum),
        RUB: Number(formattedExchangedSum),
        USD: Number(formattedExchangedSum),
    }[currency];
};


export const logInProccesing = ({ app }) => {
    if (!Cookies.get('token')) return;

    const { api, store, realtime } = app.modules;
    api.setServicesToken();

    realtime.io.emit('project.logIn', Cookies.get('token'));

    store.dispatch(store.actions.user.logIn());
    store.dispatch(store.domains.user.getProfile());
};

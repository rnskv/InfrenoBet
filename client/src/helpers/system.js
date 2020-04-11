import crypto from 'crypto';
import moment from 'moment-timezone';
import Cookies from 'js-cookie';
import { infernoClient } from 'src/index';
import { exchange } from 'shared/configs/money';

function djb2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
}

function hashStringToColor(str) {
    const hash = djb2(str);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;
    return `#${(`0${r.toString(16)}`).substr(-2)}${(`0${g.toString(16)}`).substr(-2)}${(`0${b.toString(16)}`).substr(-2)}`;
}

export function getTimeFromNow(date) {
    moment.locale('ru');
    return moment.tz(date, 'Europe/Moscow').fromNow();
}

export function getUserColorsById(id) {
    const nicknameHash = crypto.createHash('md5')
        .update(String(id))
        .digest('hex');

    const lightColor = `${hashStringToColor(nicknameHash)}59`;
    const darkColor = `${hashStringToColor(nicknameHash)}db`;
    const defaultColor = `${hashStringToColor(nicknameHash)}`;

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

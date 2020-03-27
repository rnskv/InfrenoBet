import crypto from 'crypto';
import moment from 'moment';

export function getFormattedDate(date) {
    return moment(date).format('DD/MM/YYYY, HH:MM:SS');
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
    return Number(((bet.item.cost) / (bank.total) * 100).toFixed(10));
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

const exchange = {
    USD: 1,
    EUR: 1.07,
    RUB: 0.0125,
};

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

import crypto from 'crypto';

export function getUserColorsByEmail(email) {
    const nicknameHash = crypto.createHash('md5')
        .update(String(email))
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
    return Number(((bet.item.cost) / (bank.total) * 100).toFixed(2));
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

export const getExchangedSum = (dollarSum) => {
    const currency = 'RUB';
    const exchange = {
        USD: 1,
        EUR: 1.12,
        RUB: 0.013,
    };

    const icon = {
        USD: '$',
        RUB: '₽',
        EUR: '€',
    };
    const exchangedSum = (dollarSum / exchange[currency]).toFixed(2);
    const currencyIcon = icon[currency];

    return {
        EUR: `${exchangedSum}${currencyIcon}`,
        RUB: `${exchangedSum}${currencyIcon}`,
        USD: `${currencyIcon}${exchangedSum}`
    }[currency];
};

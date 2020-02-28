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
        defaultColor
    };
}

export function getUserChances(user, bank) {
    return (bank.users[user._id] / bank.total * 100).toFixed(2);
}

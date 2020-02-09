export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function getBetValue(bet) {
    return bet.items.reduce((acc, item) => {
        return acc + item.cost;
    }, 0);
}

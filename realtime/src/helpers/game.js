export function getBetsTotalValue(bets) {
    return bets.reduce((acc, bet) => {
        return acc + bet.item.cost;
    }, 0);
}

export function getBetValue(bet) {
    return bet.items.reduce((acc, item) => {
        return acc + item.cost;
    }, 0);
}

export function getBetsTotalValue(bets) {
    return bets.reduce((acc, bet) => {
        return bet && bet.item ? acc + bet.item.cost : 0;
    }, 0);
}

export function getBetValue(bet) {
    return bet.items.reduce((acc, item) => {
        return acc + item.cost;
    }, 0);
}

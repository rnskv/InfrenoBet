export function getWinnerInfoFromGame(game) {
    const { bets } = game;
    const bank = getGameBank(bets);
    const winnerBet = bank.users[game.winner._id];

    return {
        avatar: game.winner.avatar,
        name: game.winner.name,
        amount: winnerBet,
        chance: winnerBet / bank.total * 100,
        _id: game._id,
    };
}

export function getBetsTotalValue(bets) {
    return bets.reduce((acc, bet) => {
        return bet && bet.item ? acc + bet.item.parent.cost : 0;
    }, 0);
}

export function getGameBank(bets) {
    const total = getBetsTotalValue(bets);

    const users = {};

    bets.forEach(bet => {
        //@todo Опасный участок, если удалить пользователя а транзакцию оставить - все ебанется
        const userId = bet.user._id;

        if (!!users[userId]) {
            users[userId] += bet.item.parent.cost
        } else {
            users[userId] = bet.item.parent.cost;
        }
    });

    return {
        total,
        users
    };
}
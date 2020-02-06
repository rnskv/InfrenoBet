import * as gameDomains from 'src/redux/game/domains';

// @todo to helper
function getUsers(transactions) {
    const uniqueUsers = {};

    transactions.map((transaction) => {
        uniqueUsers[transaction.user._id] = transaction.user;
    });

    return Object.values(uniqueUsers);
}


export function mapDispatchToProps(dispatch) {
    return {
        subscribe: () => dispatch(gameDomains.subscribe()),
        join: () => dispatch(gameDomains.join()),
        transaction: () => dispatch(gameDomains.transaction()),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
        time: state.game.time,
        transactions: state.game.transactions,
        hash: state.game.hash,
        winner: state.game.winner,
        secret: state.game.secret,
        transactionsPoolLength: state.game.transactionsPoolLength,
        isWaitingTransactions: state.game.isWaitingTransactions,
        users: getUsers(state.game.transactions),
    };
}

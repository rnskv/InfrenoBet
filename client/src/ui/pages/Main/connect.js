import * as gameDomains from 'src/redux/game/domains';
import * as betMakerActions from 'src/redux/betMaker/actions';

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
        openBetMaker: () => dispatch(betMakerActions.open()),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
        time: state.game.time,
        transactions: state.game.transactions,
        hash: state.game.hash,
        secret: state.game.secret,
        transactionsPoolLength: state.game.transactionsPoolLength,
        isWaitingTransactions: state.game.isWaitingTransactions,
        users: state.game.users,
        bank: state.game.bank,
        userDepositsCount: state.game.userDepositsCount,
        roulette: state.game.roulette,
        isShowWinner: state.game.isShowWinner,
    };
}

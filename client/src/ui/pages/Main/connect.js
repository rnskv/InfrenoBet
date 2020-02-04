import * as gameDomains from 'src/redux/game/domains';

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
        users: state.game.users,
        time: state.game.time,
        transactions: state.game.transactions,
        hash: state.game.hash,
        winner: state.game.winner,
        secret: state.game.secret,
    };
}

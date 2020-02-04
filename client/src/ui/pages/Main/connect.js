import * as gameDomains from 'src/redux/game/domains';

export function mapDispatchToProps(dispatch) {
    return {
        subscribe: () => dispatch(gameDomains.subscribe()),
        join: () => dispatch(gameDomains.join()),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
        users: state.game.users
    };
}

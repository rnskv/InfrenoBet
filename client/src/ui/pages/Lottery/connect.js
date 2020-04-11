import * as betMakerActions from 'src/redux/betMaker/actions';
import { infernoClient } from 'src/index';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

// @todo to helper
function getUsers(bets) {
    const uniqueUsers = {};

    bets.map((bet) => {
        uniqueUsers[bet.user._id] = bet.user;
    });

    return Object.values(uniqueUsers);
}

export function mapDispatchToProps(dispatch) {
    return {
        subscribe: () => dispatch(gameDomains.subscribe()),
        join: () => dispatch(gameDomains.join()),
        addBet: () => dispatch(gameDomains.addBet()),
        openBetMaker: () => dispatch(betMakerActions.open()),
        getProfile: () => dispatch(userDomains.getProfile()),
    };
}

// @todo почистить, создать хелперы, вводить потихоньку reselect
export function mapStateToProps(state) {
    return {
        token: state.user.token,
        time: state.game.time,
        bets: state.game.bets,
        hash: state.game.hash,
        secret: state.game.secret,
        id: state.game.id,
        betsQueueLength: state.game.betsQueueLength,
        isWaitingLastBets: state.game.isWaitingLastBets,
        users: state.game.users,
        bank: state.game.bank,
        userDepositsCount: state.game.userDepositsCount,
        roulette: state.game.roulette,
        isShowWinner: state.game.isShowWinner,
        profile: state.user.profile,
        sidebars: state.user.sidebars,
        userChance: state.game.bank.users[state.user.profile._id] / state.game.bank.total * 100 || 0,
        userItemsCount: state.game.bets.filter((bet) => bet.user._id === state.user.profile._id).length,
    };
}

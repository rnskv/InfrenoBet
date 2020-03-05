import { infernoClient } from 'src/index';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

export function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(userDomains.logOut()),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
    };
}

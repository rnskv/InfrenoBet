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
        profile: state.user.profile,
    };
}

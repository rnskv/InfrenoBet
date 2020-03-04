import { infernoClient } from 'src/index';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

export function mapDispatchToProps(dispatch) {
    return {
        logIn: ({ email, password }) => dispatch(userDomains.logIn({ email, password })),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
        isLoading: state.user.isLoading,
        error: state.user.loginError,
    };
}

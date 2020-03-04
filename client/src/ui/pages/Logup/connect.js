import { infernoClient } from 'src/index';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;import * as userActions from 'src/redux/user/actions';

export function mapDispatchToProps(dispatch) {
    return {
        logUp: (data) => dispatch(userDomains.logUp(data)),
        reset: () => dispatch(userActions.reset()),
    };
}

export function mapStateToProps(state) {
    return {
        token: state.user.token,
        isLoading: state.user.isLoading,
        isRegister: state.user.isRegister,
        error: state.user.logupError,
    };
}

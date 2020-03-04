import { infernoClient } from 'src/index';
import * as userActions from 'src/redux/user/actions';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

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

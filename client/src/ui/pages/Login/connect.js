import * as userDomains from 'src/redux/user/domains';

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

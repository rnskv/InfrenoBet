import * as userDomains from 'src/redux/user/domains';

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

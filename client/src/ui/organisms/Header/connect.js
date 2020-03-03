import * as userDomains from 'src/redux/user/domains';

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

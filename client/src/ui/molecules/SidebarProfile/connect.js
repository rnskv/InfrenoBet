export function mapStateToProps(state) {
    return {
        profile: state.user.profile,
        token: state.user.token,
    };
}

export function mapDispatchToProps(dispatch) {
    return {};
}

export function mapStateToProps(state) {
    return {
        notifications: state.user.notifications,
    };
}

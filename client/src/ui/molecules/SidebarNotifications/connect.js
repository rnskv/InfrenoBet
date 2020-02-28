import * as userActions from 'src/redux/user/actions';

export function mapStateToProps(state) {
    return {
        notifications: state.user.notifications,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        removeAllNotifications: () => dispatch(userActions.removeAllNotifications()),
    };
}

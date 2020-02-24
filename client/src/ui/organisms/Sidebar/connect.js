import * as userDomains from 'src/redux/user/domains';
import * as userActions from 'src/redux/user/actions';

export function mapDispatchToProps(dispatch) {
    return {
        open: ({ side }) => dispatch(userActions.openSidebar({ side })),
        close: ({ side }) => dispatch(userActions.closeSidebar({ side })),
    };
}

export function mapStateToProps(state) {
    return {
        sidebars: state.user.sidebars,
    };
}

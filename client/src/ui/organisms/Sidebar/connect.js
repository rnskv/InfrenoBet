import actions from 'src/redux/actions';

export function mapDispatchToProps(dispatch) {
    return {
        open: ({ side }) => dispatch(actions.user.openSidebar({ side })),
        close: ({ side }) => dispatch(actions.user.closeSidebar({ side })),
    };
}

export function mapStateToProps(state) {
    return {
        sidebars: state.user.sidebars,
    };
}

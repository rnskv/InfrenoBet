import { infernoClient } from 'src/index';

import * as userActions from 'src/redux/user/actions';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

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

import { infernoClient } from 'src/index';

const userDomains = infernoClient.modules.store.domains.user;
const gameDomains = infernoClient.modules.store.domains.game;

import * as userActions from 'src/redux/user/actions';

export function mapDispatchToProps(dispatch) {
    return {
        open: ({ side }) => dispatch(userActions.openSidebar({ side })),
        close: ({ side }) => dispatch(userActions.closeSidebar({ side })),
    };
}

export function mapStateToProps(state) {
    return {
        sidebars: state.user.sidebars
    };
}

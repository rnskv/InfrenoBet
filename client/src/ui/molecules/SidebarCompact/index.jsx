import PropTypes from 'prop-types';
import React from 'react';

import Collapse from 'ui/atoms/Collapse';

import { infernoClient } from 'src/index';
import { useActions, useAuth } from 'src/helpers/hooks';

import {
    Container,
    Wrapper,
    StyledAvatar
} from './styled';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';
import { useProfile } from 'src/redux/user/hooks/selectors';
import Link from 'ui/atoms/Link';

const { openSidebar, closeSidebar } = infernoClient.modules.store.actions.user;

function SidebarCompact({ className, style }) {
    const actions = useActions({ openSidebar, closeSidebar });
    const profile = useProfile();
    const isAuth = useAuth();

    return (
        <Container className={className} style={style}>
            <Wrapper>
                <Collapse
                    isOpened={false}
                    side="right"
                    onClick={() => actions.openSidebar({ side: 'right' })}
                />
                <Link to={'/account'}>
                    { isAuth && <StyledAvatar src={profile.avatar}/> }
                </Link>
                <SidebarNavigation isCompact />
            </Wrapper>
        </Container>
    );
}

SidebarCompact.propTypes = {
    children: PropTypes.node,
};

export default SidebarCompact;

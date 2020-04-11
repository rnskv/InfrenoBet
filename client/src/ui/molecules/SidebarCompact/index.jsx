import PropTypes from 'prop-types';
import React from 'react';

import Collapse from 'ui/atoms/Collapse';

import { infernoClient } from 'src/index';
import { useActions } from 'src/helpers/hooks';
import {
    Container,
    Wrapper,
} from './styled';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';

const { openSidebar, closeSidebar } = infernoClient.modules.store.actions.user;

function SidebarCompact({ className, style }) {
    const actions = useActions({ openSidebar, closeSidebar });

    return (
        <Container className={className} style={style}>
            <Wrapper>
                <Collapse
                    isOpened={false}
                    side="right"
                    onClick={() => actions.openSidebar({ side: 'right' })}
                />
                <SidebarNavigation isCompact />
            </Wrapper>
        </Container>
    );
}

SidebarCompact.propTypes = {
    children: PropTypes.node,
};

export default SidebarCompact;

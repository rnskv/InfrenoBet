import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
} from './styled';

function SidebarNavigation({ className, style }) {
    return (
        <Container className={className} style={style}>
            Навигация
        </Container>
    );
}

SidebarNavigation.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarNavigation;

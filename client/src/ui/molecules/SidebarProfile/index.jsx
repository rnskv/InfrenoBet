import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Image,
} from './styled';

function SidebarProfile({ className, style }) {
    return (
        <Container className={className} style={style}>
            Профайл
        </Container>
    );
}

SidebarProfile.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarProfile;

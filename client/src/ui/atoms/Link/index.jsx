import React from 'react';

import styled from 'styled-components';

import {
    Link as RouterLink,
} from 'react-router-dom';

const StyledLink = styled(RouterLink)`

`;

function Link(props) {
    return <StyledLink {...props} />;
}

export default Link;

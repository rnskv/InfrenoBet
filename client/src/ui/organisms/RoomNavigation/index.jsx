import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import {
    Container,
    StyledForm,
    Label,
    Name,
    Logo
} from './styled';
import { NavigationIcon } from '../Navigation/styled';

function RoomNavigation() {
    return (
        <Container>
            <Logo>
                <svg>
                    <use xlinkHref={`#classic-logo`} />
                </svg>
                <span>Рулетка</span>
            </Logo>
        </Container>
    );
}

RoomNavigation.propTypes = {
    logUp: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default RoomNavigation;

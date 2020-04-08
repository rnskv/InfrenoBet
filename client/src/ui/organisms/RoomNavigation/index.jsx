import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';

import {
    Container,
    StyledForm,
    Label,
    Name,
    Logo,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';

function RoomNavigation({ svgId, svg, title, url }) {
    return (
        <Link to={url}>
            <Container>
                <Logo>
                    {svg && <Svg src={svg}/> || svgId && (
                        <svg>
                            <use xlinkHref={`#${svgId}`} />
                        </svg>
                    )}
                    <span>{ title }</span>
                </Logo>
            </Container>
        </Link>
    );
}

RoomNavigation.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    svgId: PropTypes.string,
};

RoomNavigation.defaultProps = {
    svgId: null,
};

export default RoomNavigation;

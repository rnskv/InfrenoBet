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
    SubPage,
    Logo,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';

function RoomNavigation({
    svgId, svg, title, url, subPages, currentPage,
}) {
    return (
        <Container>
            <Link to={url}>
                <Logo>
                    {svg && <Svg src={svg} /> || svgId && (
                        <svg>
                            <use xlinkHref={`#${svgId}`} />
                        </svg>
                    )}
                    <span>{ title }</span>
                </Logo>
            </Link>
            { subPages.map((page) => (
                <Link to={page.url}>
                    <SubPage isActive={page.name === currentPage}>
                        { page.title }
                    </SubPage>
                </Link>
            ))}
        </Container>

    );
}

RoomNavigation.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    svgId: PropTypes.string,
    subPages: PropTypes.array,
    currentPage: PropTypes.string,
};

RoomNavigation.defaultProps = {
    svgId: null,
    subPages: [],
    currentPage: '',
};

export default RoomNavigation;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SVG from 'svg-inline-react';
import {
    Container,
    Title,
} from './styled';


function VerticalTab({
    name,
    title,
    svg,
    onClick,
    isActive,
}) {
    return (
        <Container isActive={isActive} onClick={onClick}>
            <SVG src={svg} />
            <Title>{ title }</Title>
        </Container>
    );
}

VerticalTab.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    svg: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
};

VerticalTab.defaultProps = {
    isActive: false,
    onClick: null,
};

export default VerticalTab;

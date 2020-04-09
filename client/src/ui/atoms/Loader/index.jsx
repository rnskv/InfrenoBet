import PropTypes from 'prop-types';
import React from 'react';


import InlineSVG from 'svg-inline-react';
import ovalLoaderSvg from 'src/resources/svg/oval-loader.svg';

import {
    Container,
    StyledContainer,
} from './styled';

function Loader({
    className, style, children, size, color, isStyled, ...props
}) {
    const Wrapper = isStyled ? StyledContainer : Container;

    return (
        <Wrapper {...props} className={className} style={style} size={size} color={color}>
            <InlineSVG src={ovalLoaderSvg} />
        </Wrapper>
    );
}

Loader.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
};

Loader.defaultProps = {
    size: 'small',
    color: 'dark',
};

export default Loader;

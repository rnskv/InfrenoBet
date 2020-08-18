import PropTypes from 'prop-types';
import React from 'react';


import InlineSVG from 'svg-inline-react';
import ovalLoaderSvg from 'src/resources/svg/oval-loader.svg';

import {
    Container,
    StyledContainer,
} from './styled';

function Loader({
    className, style, children, size, color, isCover, isStyled, isVisible,...props
}) {
    const Wrapper = isStyled ? StyledContainer : Container;

    if (!isVisible) return <></>;

    return (
        <Wrapper{...props} className={className} style={style} size={size} color={color} isCover={isCover}>
            <InlineSVG src={ovalLoaderSvg} />
        </Wrapper>
    );
}

Loader.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    isVisible: PropTypes.bool,
};

Loader.defaultProps = {
    size: 'small',
    color: 'dark',
    isVisible: true
};

export default Loader;

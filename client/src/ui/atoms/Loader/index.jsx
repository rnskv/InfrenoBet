import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
} from './styled';

import InlineSVG from 'svg-inline-react';
import ovalLoaderSvg from 'src/resources/svg/oval-loader.svg';

function Loader({ className, style, children, ...props }) {
    return (
        <Container {...props} className={className} style={style}>
            <InlineSVG src={ovalLoaderSvg} />
        </Container>
    );
}

Loader.propTypes = {
};

export default Loader;

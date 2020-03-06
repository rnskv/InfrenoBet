import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
} from './styled';

function NumbersPlace({ className, style, children, ...props }) {
    return (
        <Container {...props} className={className} style={style}>
            {children}
        </Container>
    );
}

NumbersPlace.propTypes = {
};

export default NumbersPlace;

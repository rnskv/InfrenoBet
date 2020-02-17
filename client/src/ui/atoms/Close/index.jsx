import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
} from './styled';

function Close({ className, style, ...props }) {
    return (
        <Container {...props} className={className} style={style}>
            X
        </Container>
    );
}

Close.propTypes = {
};

export default Close;

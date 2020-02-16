import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Image,
} from './styled';

function Close({ className, style, ...props }) {
    return (
        <Container {...props} className={className} style={style}>
            X
        </Container>
    );
}

Close.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Close;

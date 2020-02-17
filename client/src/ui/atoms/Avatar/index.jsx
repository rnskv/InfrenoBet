import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Image,
} from './styled';

function Avatar({ src, className, style }) {
    return (
        <Container className={className} style={style}>
            <Image src={src} />
        </Container>
    );
}

Avatar.propTypes = {
};

export default Avatar;

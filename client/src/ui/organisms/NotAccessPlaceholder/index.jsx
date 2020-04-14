import PropTypes from 'prop-types';

import React from 'react';

import {
    Container,
    Title,
} from './styled';

function NotAccessPlaceholder({ isVisible }) {
    if (!isVisible) return <></>;

    return (
        <Container>
            <Title>Недоступно</Title>
        </Container>
    );
}

NotAccessPlaceholder.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default NotAccessPlaceholder;

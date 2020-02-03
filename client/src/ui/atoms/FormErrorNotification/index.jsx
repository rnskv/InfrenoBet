import PropTypes from 'prop-types';
import React from 'react';

import { Container } from './styled';

function FormErrorNotification({ error }) {
    if (!error) return null;

    return (
        <Container>
            {error}
        </Container>
    );
}

FormErrorNotification.propTypes = {
    error: PropTypes.string.isRequired,
};

export default FormErrorNotification;

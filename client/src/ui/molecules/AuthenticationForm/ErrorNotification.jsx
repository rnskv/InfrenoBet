import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';
import Title from 'ui/atoms/Title';

const Container = styled.div`
    background: var(--color-grey-500);
    color: var(--color-yellow);
    
    text-align: center;
    text-decoration: uppercase;

    padding: 15px;
    margin: 0 0 15px;
`;

function ErrorNotification({ error }) {
    if (!error) return null;

    return (
        <Container> {error} </Container>
    );
}

ErrorNotification.propTypes = {
    error: PropTypes.string
};

export default ErrorNotification;

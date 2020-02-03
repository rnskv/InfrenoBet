import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';
import Title from 'ui/atoms/Title';

import ErrorNotification from './ErrorNotification';

const StyledForm = styled.form`
    width: 500px;
    background: var(--color-darkblue);
    
    padding: 25px;
    margin: 25px;
    border-radius: 8px;
    
    ${Title} {
        margin: 0 0 25px;
    }
`;

function AuthenticationForm({
    children, title, error, ...props
}) {
    return (
        <StyledForm {...props}>
            <Title>{title}</Title>
            <ErrorNotification error={error} />
            { children }
        </StyledForm>
    );
}

AuthenticationForm.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
};

export default AuthenticationForm;

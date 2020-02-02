import React from 'react';
import styled from 'styled-components';
import Title from 'ui/atoms/Title';

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

function AuthenticationForm({ children, title, ...props }) {
    return (
        <StyledForm {...props}>
            <Title>{title}</Title>
            { children }
        </StyledForm>
    );
}

export default AuthenticationForm;

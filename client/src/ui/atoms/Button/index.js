import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    
`;

function Button({ text }) {
    return (
        <StyledButton>
            { text }
        </StyledButton>
    )
}

export default Button;

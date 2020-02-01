import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: red;
`;

function Example({ children, ...props }) {
    return (
        <StyledDiv>
            { children }
        </StyledDiv>
    )
}

export default Example;

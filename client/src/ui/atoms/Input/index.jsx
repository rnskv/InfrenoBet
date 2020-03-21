import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    color: var(--color-white);
    background: var(--color-black);
    border: 1px solid var(--color-black);
    padding: 10px 10px;
    font-size: 14px; 
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
    
    &:focus {
        border-color: var(--color-yellow);
        outline: none;
    }
`;

const Label = styled.label`
  display: block;

  span {
    color: var(--color-white);
    padding: 10px;
    font-size: 14px;
    display: block;
  }
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

function Input({ label, ...props }) {
    return (
        <Container>
            <Label>
                <span>{ label }</span>
                <StyledInput {...props} />
            </Label>
        </Container>
    );
}

export default Input;

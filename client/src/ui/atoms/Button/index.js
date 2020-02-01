import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: var(--color-yellow);
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: .3s;
    
    &:hover {
    cursor: pointer;
       background-color: var(--color-yellow-active);
    }
`;


export default StyledButton;

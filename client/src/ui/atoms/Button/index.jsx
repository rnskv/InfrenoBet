import React from 'react';

import styled from 'styled-components';

const getButtonStyle = (type, props) => {
    switch (type) {
    case 'classic': {
        return `
            background-color: var(--color-yellow);
          
            border: none;
            
            &:hover {
               background-color: var(--color-yellow-active);
            }
        `;
    }

    case 'transparent': {
        return `
            background-color: transparent;
            border: 1px solid var(--color-yellow);
            border-radius: 4px;
            color: var(--color-yellow);
            
            &:hover {
               color: var(--color-black);
               background-color: var(--color-yellow);
            }
        `;
    }
    }
};

const StyledButton = styled.button`
    padding: 10px 15px;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    transition: .3s;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ type }) => getButtonStyle(type)}
`;

function Button({ type, children, ...props }) {
    return (
        <StyledButton type={type} {...props}>
            {children}
        </StyledButton>
    );
}

Button.defaultProps = {
    type: 'classic',
};

export default Button;

import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import Loader from 'ui/atoms//Loader';

const getButtonStyle = (type, props) => {
    switch (type) {
    case 'classic': {
        return `
            background-color: var(--color-yellow);
            color: var(--color-grey-800);
            border: none;
            
            &:hover {
               background-color: var(--color-yellow-active);
            }
            
            &:active {
               background-color: var(--color-yellow-focus);
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

    case 'black': {
        return `
            background-color: var(--color-grey-600);
            border: none;
            color: var(--color-grey);
            
            &:hover {
                background-color: var(--color-grey-400);
            }
        `;
    }
    }
};

const StyledButton = styled.button`
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

    padding: 0 15px;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    transition: .3s;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    min-height: 40px;
    ${({ type }) => getButtonStyle(type)}
`;

function Button({
    isVisible, type, disabled, children, isLoading, ...props
}) {
    if (!isVisible) return <></>;

    return (
        <StyledButton type={type} {...props} disabled={disabled}>
            {!isLoading ? children : <Loader type="small" />}
        </StyledButton>
    );
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
};

Button.defaultProps = {
    isVisible: true,
    isLoading: false,
    type: 'classic',
};

export default Button;

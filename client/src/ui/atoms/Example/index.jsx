import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: red;
`;

function Example({ children }) {
    return (
        <StyledDiv>
            { children }
        </StyledDiv>
    );
}

Example.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Example;

import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    width: 100%;
    height: 50px;
    color: #fff;
    background-color: #000;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.header`

`;


function Default({ children, ...props }) {
    return (
        <div {...props}>
            <Header>Шапка</Header>
            { children }
        </div>
    );
}


Default.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Default;

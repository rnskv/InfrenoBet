import React from 'react';
import styled from 'styled-components'

import LoginForm from "ui/organisms/LoginForm";

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


function Default({children, ...props}) {
    return (
        <div>
            <Header>Шапка</Header>
            { children }
        </div>
    )
}

export default Default;

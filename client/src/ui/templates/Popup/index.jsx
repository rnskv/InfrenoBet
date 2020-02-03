import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';

const Header = styled.header`
    width: 100%;
    height: 50px;
    color: #fff;
    background-color: #000;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    margin: 25px auto;
    box-sizing: border-box;
    width: 900px;
}

`;

const Page = styled.div`
    display: flex;
`;

function Popup({ children, ...props }) {
    return (
        <div {...props}>
            <Header>Header</Header>
            <Page>
                <Navigation />
                <Content>
                    { children }
                </Content>
            </Page>
        </div>
    );
}


Popup.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Popup;

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
    background: var(--color-grey-500);
    box-sizing: border-box;
    width: 900px;
    word-break: break-all;
    color: var(--color-grey);
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px var(--color-shadow);
}

`;

const Page = styled.div`
    display: flex;
`;

function Default({ children, ...props }) {
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


Default.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Default;

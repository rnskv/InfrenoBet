import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';
import Sidebar from 'ui/organisms/Sidebar';

import SidebarNotifications from 'ui/molecules/SidebarNotifications';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';
import SidebarProfile from 'ui/molecules/SidebarProfile';

import { Container } from '../../organisms/Sidebar/styled';

const Header = styled.header`
    width: 100%;
    height: 50px;
    color: #fff;
    background-color: #000;
    
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
`;

const Content = styled.div`
    margin: 75px auto;
    background: var(--color-grey-500);
    box-sizing: border-box;
    width: 900px;
    word-break: break-all;
    color: var(--color-grey);
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px var(--color-shadow);
    align-self: flex-start;
    overflow: hidden;
    min-width: 900px;
`;

const Page = styled.div`
    display: flex;
`;

function Default({ children, ...props }) {
    return (
        <div {...props}>
            <Header>Header</Header>
            <Page>
                <Sidebar params={{
                    side: 'left',
                }}
                >
                    <Navigation />
                </Sidebar>
                <Content>
                    { children }
                </Content>
                <Sidebar params={{
                    side: 'right',
                }}
                >
                    {/*<SidebarProfile />*/}
                    {/*<SidebarNavigation />*/}
                    <SidebarNotifications />
                </Sidebar>
            </Page>
            <div hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" id="collapse">
                    <path d="M0 7.022L4.912.045 8.257 0 3.344 6.904l4.913 7.051L4.912 14 0 7.022zm6.743 0L11.656.045 15 0l-4.912 6.904L15 13.955 11.656 14 6.743 7.022z" />
                </svg>
            </div>
        </div>
    );
}


Default.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Default;

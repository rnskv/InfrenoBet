import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';
import Sidebar from 'ui/organisms/Sidebar';
import Header from 'ui/organisms/Header';

import SidebarNotifications from 'ui/molecules/SidebarNotifications';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';
import SidebarProfile from 'ui/molecules/SidebarProfile';

import { Container } from '../../organisms/Sidebar/styled';

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
            <Header />
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
                    {/* <SidebarProfile /> */}
                    {/* <SidebarNavigation /> */}
                    <SidebarNotifications />
                </Sidebar>
            </Page>
            <div hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" id="collapse">
                    <path d="M0 7.022L4.912.045 8.257 0 3.344 6.904l4.913 7.051L4.912 14 0 7.022zm6.743 0L11.656.045 15 0l-4.912 6.904L15 13.955 11.656 14 6.743 7.022z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" id="classic-logo">
                    <path d="M139.92 278.83c-75.57 0-137.05-61.48-137.05-137.05C2.87 66.2 64.35 4.73 139.92 4.73c75.58 0 137.06 61.48 137.06 137.05 0 75.57-61.48 137.05-137.06 137.05zm0-256.23c-65.7 0-119.18 53.47-119.18 119.18 0 65.7 53.47 119.18 119.18 119.18 65.7 0 119.18-53.47 119.18-119.18 0-65.7-53.47-119.18-119.18-119.18z" />
                    <path d="M196.6 198.76c0-4.66-3.77-8.42-8.42-8.42h-96.5c-4.64 0-8.4 3.76-8.4 8.42s3.76 8.42 8.4 8.42h96.5c4.65 0 8.42-3.78 8.42-8.42zM74.77 130.6c.14 0 .27 0 .4-.03l13.35 48.33h102.83l13.36-48.33.4.02c5.55 0 10.04-4.5 10.04-10.05 0-5.53-4.5-10-10.02-10s-10 4.47-10 10c0 1.07.16 2.1.5 3.08l-24.16 14.12-25.96-43.03c2.7-1.8 4.5-4.87 4.5-8.35 0-5.53-4.5-10.02-10.02-10.02-5.53 0-10.02 4.5-10.02 10 0 3.5 1.78 6.57 4.5 8.36l-25.97 43.04-24.16-14.12c.32-.97.5-2 .5-3.08 0-5.53-4.48-10-10-10-5.55 0-10.04 4.47-10.04 10s4.5 10.02 10 10.02z" />
                </svg>
            </div>
        </div>
    );
}


Default.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Default;

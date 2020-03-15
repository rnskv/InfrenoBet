import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';
import Sidebar from 'ui/organisms/Sidebar';
import Header from 'ui/organisms/Header';

import SidebarNotifications from 'ui/molecules/SidebarNotifications';
import SidebarProfile from 'ui/molecules/SidebarProfile';

const Content = styled.div`
    margin: 75px auto;
    background: var(--color-grey-500);
    box-sizing: border-box;
    width: 900px;
    color: var(--color-grey);
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px var(--color-shadow);
    align-self: flex-start;
    overflow: hidden;
    min-width: 900px;
`;

const Page = styled.div`
    display: flex;
`;


const { VK_CLIENT_ID, VK_REDIRECT_URL } = process.env;

function openAuthWindow() {
    const authWindow = window.open(
        `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=friends&response_type=code&v=5.103`,
        '_blank',
        'width=250',
        'height=250',
    );

    authWindow.onunload = () => window.location.replace('/');
}

function Default({ children, ...props }) {
    return (
        <div {...props}>
            <button onClick={openAuthWindow}>Через вк</button>
            <Header />
            <Page>
                <Sidebar
                    params={{
                        side: 'left',
                    }}
                >
                    <Navigation />
                </Sidebar>
                <Content>{children}</Content>
                <Sidebar
                    params={{
                        side: 'right',
                    }}
                >
                    <SidebarProfile />
                    {/* <SidebarNavigation /> */}
                    <SidebarNotifications />
                </Sidebar>
            </Page>
        </div>
    );
}

Default.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Default;

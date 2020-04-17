import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';

import Navigation from 'ui/organisms/Navigation';
import Sidebar from 'ui/organisms/Sidebar';
import Header from 'ui/organisms/Header';

import SidebarNotifications from 'ui/molecules/SidebarNotifications';
import SidebarNavigation from 'ui/molecules/SidebarNavigation';
import SidebarProfile from 'ui/molecules/SidebarProfile';
import LoginPopup from 'ui/organisms/LoginPopup';
import SidebarCompact from 'ui/molecules/SidebarCompact';

import media from 'src/helpers/media';
import { useSidebar } from 'src/redux/user/hooks/selectors';
import OnlineUsers from 'ui/molecules/OnlineUsers';
import SocialNetworks from 'ui/molecules/SocialNetworks';

const Content = styled.div`
    margin: 25px auto 0;
    background: var(--color-grey-500);
    box-sizing: border-box;
    width: 900px;
    color: var(--color-grey);
    border-radius: 4px;
    box-shadow: 0px 0px 3px 0px var(--color-shadow);
    align-self: flex-start;
    overflow: hidden;
    ${media.tablet`
        width: 100%;
    `}
`;

const PrevContent = styled.div`
  margin-top: ${({ isNeedMargin }) => (isNeedMargin ? '25px' : 0)};
  width: 900px;
  ${media.tablet`
    width: 100%;
  `}
`;

const Page = styled.div`
    display: flex;
    margin-top: calc(var(--header-height));
    margin-bottom: 75px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Vertical = styled.div`

`;

const SIDEBAR_TABS = {
    NOTIFICATIONS: <SidebarNotifications />,
    CHAT: <div style={{
        color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px',
    }}
    >
        В разработке
    </div>,
};

function Default({
    children, widgets, prevContent, ...props
}) {
    const sidebarData = useSidebar();

    return (
        <div {...props}>
            <Header />
            <LoginPopup />
            <Wrapper>
                <Page>
                    <Sidebar
                        params={{
                            side: 'left',
                        }}
                    >
                        <Navigation />
                        <OnlineUsers />
                        <SocialNetworks />
                    </Sidebar>
                    <Wrapper>
                        <Vertical>
                            <PrevContent isNeedMargin={!!prevContent.length}>
                                { prevContent }
                            </PrevContent>
                            <Content>
                                {children}
                            </Content>
                        </Vertical>
                        { widgets }
                    </Wrapper>
                    <Sidebar
                        params={{
                            side: 'right',
                        }}
                    >
                        <SidebarProfile />
                        <SidebarNavigation />
                        { SIDEBAR_TABS[sidebarData.activeTabName] }
                    </Sidebar>
                    <SidebarCompact />
                </Page>
            </Wrapper>
        </div>
    );
}

Default.propTypes = {
    children: PropTypes.node.isRequired,
    widgets: PropTypes.array,
    prevContent: PropTypes.array,
};

Default.defaultProps = {
    widgets: [],
    prevContent: [],
};

export default React.memo(Default, () => false);

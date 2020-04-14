import PropTypes from 'prop-types';
import React from 'react';
import Svg from 'svg-inline-react';

import settingsSvg from 'src/resources/svg/settings.svg';
import notificationsSvg from 'src/resources/svg/notifications.svg';
import chatSvg from 'src/resources/svg/chat.svg';
import supportSvg from 'src/resources/svg/support.svg';
import withdrawSvg from 'src/resources/svg/withdraw.svg';
import { useHistory } from 'react-router-dom';
import { useSidebarActions } from 'src/redux/user/hooks/actions';
import { useSidebar } from 'src/redux/user/hooks/selectors';

import notifications from 'shared/configs/notifications';
import { useAuth } from 'src/helpers/hooks';
import {
    Container,
    Icon,
    Circle,
} from './styled';

function SidebarNavigation({ isCompact, className, style }) {
    const data = useSidebar();
    const actions = useSidebarActions();
    const history = useHistory();
    const isAuth = useAuth();

    const TABS = [
        {
            name: 'CHAT',
            svg: chatSvg,
            props: {},
        },
        {
            name: 'NOTIFICATIONS',
            svg: notificationsSvg,
            props: {
                key: `notifications_count_${data.notifications.length}`,
                'data-isNeedAnimation': !!data.notifications.length,
            },
            children: (<Circle
                key={`notifications_count_${data.notifications.length}`}
                data-isNeedAnimation={!!data.notifications.length}
            />),

        },
        {
            name: 'SETTINGS',
            svg: settingsSvg,
            props: {},
            onlyAuth: true,
        },
        {
            name: 'WITHDRAW',
            svg: withdrawSvg,
            props: {},
            onlyAuth: true,
        },
        {
            name: 'SUPPORT',
            svg: supportSvg,
            props: {},
            onlyAuth: true,
        },
    ];

    const executeTabAction = ({ name }) => {
        switch (name) {
        case 'CHAT': {
            actions.open({ side: 'right' });
            actions.changeTab({ name });
            break;
        }

        case 'NOTIFICATIONS': {
            actions.open({ side: 'right' });
            actions.changeTab({ name });
            break;
        }

        case 'SETTINGS': {
            history.push('/account/settings');
            break;
        }

        case 'SUPPORT': {
            history.push('/support');
            break;
        }

        case 'WITHDRAW': {
            history.push('/withdraw');
            break;
        }
        }
    };

    return (
        <Container isCompact={isCompact} className={className} style={style}>
            {
                TABS.map((tab) => (
                    <Icon
                        key={tab.name}
                        onClick={() => {
                            executeTabAction({ name: tab.name });
                        }}
                        isActive={tab.name === data.activeTabName}
                        name={tab.name}
                        hidden={tab.onlyAuth && !isAuth}
                        {...tab.props}
                    >
                        { tab.children || [] }
                        <Svg src={tab.svg} />
                    </Icon>
                ))
            }
        </Container>
    );
}

SidebarNavigation.propTypes = {
};

export default SidebarNavigation;

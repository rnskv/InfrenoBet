import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { StateContext } from 'ui/organisms/Sidebar';
import {
    Container,
    Controls,
    Button,
    NotificationsList,
    StyledNotification,
    Icon,
    Message,
} from './styled';

import { mapDispatchToProps, mapStateToProps } from './connect';
import { useSidebarActions } from 'src/redux/user/hooks/actions';


function SidebarNotifications({
    notifications, className, style, removeAllNotifications,
}) {
    const actions = useSidebarActions();
    const { isOpened } = useContext(StateContext);
    return (
        <Container className={className} style={style} isOpened={isOpened}>
            <Controls>
                <Button onClick={removeAllNotifications}>Очистить</Button>
                <Button onClick={() => actions.changeTab({ name: 'CHAT' })}>Закрыть</Button>
            </Controls>
            <NotificationsList>
                {
                    notifications.length
                        ? notifications.map((params) => (
                            <StyledNotification
                                key={params.id}
                                {...params}
                            />
                        ))
                        : <Message>У вас нет непрочитанных уведомлений</Message>
                }
            </NotificationsList>
        </Container>
    );
}

SidebarNotifications.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SidebarNotifications, (prevProps, nextProps) => prevProps.notifications.length === nextProps.notifications.length));

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
} from './styled';

import { mapDispatchToProps, mapStateToProps } from './connect';


function SidebarNotifications({ notifications, className, style }) {
    const { isOpened } = useContext(StateContext);
    return (
        <Container className={className} style={style} isOpened={isOpened}>
            <Controls>
                <Button>Очистить</Button>
                <Button>Закрыть</Button>
            </Controls>
            <Icon src="https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1" />
            <NotificationsList>
                {
                    notifications.map(({ text, date, title }, index) => <StyledNotification key={notifications.length - index} title={title} text={text} date={date} />)
                }
            </NotificationsList>
        </Container>
    );
}

SidebarNotifications.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNotifications);

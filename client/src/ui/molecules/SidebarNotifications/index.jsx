import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import {
    Container,
    Controls,
    Button,
    NotificationsList,
    StyledNotification,
    Icon
} from './styled';

import { StateContext } from 'ui/organisms/Sidebar';

const mock = [
    {
        text: 'Ошибка такая то',
        date: '29.06.1999',
    },
    {
        text: 'Ошибка другая то',
        date: '29.06.1999',
    },
    {
        text: 'Ошибка третья то',
        date: '29.06.1999',
    },
];

function SidebarNotifications({ className, style }) {
    const { isOpened } = useContext(StateContext);
    return (
        <Container className={className} style={style} isOpened={isOpened}>
            <Controls>
                <Button>Очистить</Button>
                <Button>Закрыть</Button>
            </Controls>
            <Icon src="https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1"/>
            <NotificationsList>
                {
                    mock.map(({ text, date }) => <StyledNotification text={text} date={date}/>)
                }
            </NotificationsList>
        </Container>
    );
}

SidebarNotifications.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarNotifications;

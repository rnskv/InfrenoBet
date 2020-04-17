import PropTypes from 'prop-types';

import React, { useContext } from 'react';

import {
    Container,
} from './styled';
import { useTotalOnline } from 'src/redux/user/hooks/selectors';
import { StateContext } from 'ui/organisms/Sidebar';

function OnlineUsers() {
    const sidebarState = useContext(StateContext);
    const totalOnline = useTotalOnline();

    return (
        <Container isVisible={sidebarState.isOpened}>
            <span>Игроков онлайн:</span>
            <span>{ totalOnline }</span>
        </Container>
    );
}

OnlineUsers.propTypes = {
};

export default OnlineUsers;

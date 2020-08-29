import React from 'react';
import PropTypes from 'prop-types';

import GameWidgets from 'ui/organisms/GameWidgets';
import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import { AvatarBlock, StyledAvatar } from 'ui/molecules/UserWidget/styled';

function TopPlayers({ backgroundUrl, avatar, name }) {
    return (
        <DefaultTemplate widgets={<GameWidgets />}>
            <RoomNavigation url="/game/top_players" title="TОП игроков" />
            <AvatarBlock backgroundUrl={backgroundUrl}>
                <StyledAvatar src={avatar} />
                <span>{name}</span>
            </AvatarBlock>
            fghj
        </DefaultTemplate>
    );
}

TopPlayers.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    backgroundUrl: PropTypes.string,
};

TopPlayers.defaultProps = {
    avatar: 'https://vk.com/images/camera_50.png?ava=1',
    name: '???',
    backgroundUrl: '',
};

export default TopPlayers;

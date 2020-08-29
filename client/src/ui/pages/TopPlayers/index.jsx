import React from 'react';
import PropTypes from 'prop-types';

import GameWidgets from 'ui/organisms/GameWidgets';
import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Avatar from 'ui/atoms/Avatar';
import useTopPlayers from './hooks/useTopPlayers';
import { getExchangedSum } from 'src/helpers/system';
import { Container, Player, Position, Name, TotalWin, HeaderCell, AvatarBlock } from './styled';

function TopPlayers({ backgroundUrl, avatar, name }) {
    const { data: topPlayers, error, pending } = useTopPlayers();

    if (pending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Ooops, something went wrong...</div>
    }

    if (!topPlayers) {
        return <div>Empty data...</div>
    }

    return (
        <DefaultTemplate widgets={<GameWidgets />}>
            <RoomNavigation url="/game/top_players" title="TОП игроков" />
            <Container>
                <thead>
                    <tr>
                        <HeaderCell>Место</HeaderCell>
                        <HeaderCell>Аватар</HeaderCell>
                        <HeaderCell>Имя</HeaderCell>
                        <HeaderCell>Общий выигрыш</HeaderCell>
                    </tr>
                </thead>
                <tbody>
                {
                    topPlayers.map((player, index) => (
                        <Player>
                            <Position>
                                { index + 1 }
                            </Position>
                            <AvatarBlock>
                                <Avatar src={player.user.avatar} style={{ display: 'flex' }} />
                            </AvatarBlock>
                            <Name>{player.user.name || player.user.login}</Name>
                            <TotalWin>{ getExchangedSum(player.totalWin, { accuracy: 2 }) }</TotalWin>
                        </Player>
                    ))
                }
                </tbody>
            </Container>
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

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ModuleLoader from 'ui/atoms/ModuleLoader';

import GameWidgets from 'ui/organisms/GameWidgets';
import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Avatar from 'ui/atoms/Avatar';
import Loader from 'ui/atoms/Loader';
import useTopPlayers from './hooks/useTopPlayers';
import { getExchangedSum } from 'src/helpers/system';
import { Container, Player, Position, Name, TotalWin, HeaderCell, AvatarBlock, Prize, Empty } from './styled';
import moment from 'moment';

function TopPlayers({ backgroundUrl, avatar, name }) {
    const { data: topPlayers = [], error, pending } = useTopPlayers();

    if (error) {
        return <div>Ooops, something went wrong...</div>
    }

    const PRIZES = {
        1: 1000,
        2: 500,
        3: 100,
    }

    const players = useMemo(() => {
        const empty = new Array(10).fill(null);

        if (!topPlayers) return empty;

        return [...topPlayers.list, ...empty].slice(0, 10);
    }, [topPlayers])

    if (!topPlayers) { 
        return <ModuleLoader isLoading fullScreen />
    }

    return (
        <DefaultTemplate widgets={<GameWidgets />}>
            <RoomNavigation url="/game/top_players" title={"TОП игроков: " + moment(topPlayers.start).format('DD/MM/YYYY') + ' - ' + moment(topPlayers.end).format('DD/MM/YYYY')} />
            <Container>
                <Loader isVisible={pending}/>
                <thead>
                    <tr>
                        <HeaderCell>Место</HeaderCell>
                        <HeaderCell>Аватар</HeaderCell>
                        <HeaderCell>Имя</HeaderCell>
                        <HeaderCell>Общий выигрыш</HeaderCell>
                        <HeaderCell>Подарок</HeaderCell>
                    </tr>
                </thead>
                <tbody>
                {
                    players.map((player, index) => player ? (
                        <Player key={player.name}>
                            <Position>
                                { index + 1 }
                            </Position>
                            <AvatarBlock>
                                <Avatar experience={player.user.experience} src={player.user.avatar} style={{ display: 'flex' }} />
                            </AvatarBlock>
                            <Name>{player.user.name || player.user.login}</Name>
                            <TotalWin>{ getExchangedSum(player.totalWin, { accuracy: 2 }) }</TotalWin>
                            <Prize>{ PRIZES[index + 1] ? `${PRIZES[index + 1]} руб.` : '-' }</Prize>
                        </Player>
                    ) : <Player key={index}>
                            <Position>
                                { index + 1 }
                            </Position>
                            <Empty>
                                Место свободно
                            </Empty>
                            <Name/>
                            <TotalWin/>
                            <Prize>-</Prize>
                        </Player>)
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

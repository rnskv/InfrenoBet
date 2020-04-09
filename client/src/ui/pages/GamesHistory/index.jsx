import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Section from 'ui/atoms/Section';
import WithdrawHistory from 'ui/organisms/WithdrawHistory';
import WithdrawModeration from 'ui/organisms/WithdrawModeration';
import GameHistory from 'ui/organisms/GameHistory';
import { infernoClient } from 'src/index';
import Loader from 'ui/atoms/Loader';
import classicLogoSvg from 'src/resources/svg/classic-logo.svg';

function GamesHistory() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {
        const { games } = infernoClient.modules.api.services;
        async function fetchData() {
            setIsLoading(true);
            const response = await games.execute('getAll');
            setHistory(response);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <DefaultTemplate>
            <RoomNavigation
                svgId="classic-logo"
                svg={classicLogoSvg}
                url="/game/lottery"
                title="Лотерея"
                subPages={[{ name: 'history', title: 'История', url: '/game/lottery/history' }]}
                currentPage="history"
            />
            { isLoading && <Loader isStyled size="big" color="white" /> }
            { history.map((game) => <GameHistory game={game} />)}
        </DefaultTemplate>
    );
}

GamesHistory.propTypes = {
};

GamesHistory.defaultProps = {
};

export default GamesHistory;

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';

import DefaultTemplate from 'ui/templates/Default';
import UsersBanks from 'ui/organisms/UsersBanks';
import GameInfo from 'ui/organisms/GameInfo';
import GameBeginFooter from 'ui/organisms/GameBeginFooter';
import GameControls from 'ui/organisms/GameControls';
import GameEndFooter from 'ui/organisms/GameEndFooter';
import BetMaker from 'ui/organisms/BetMaker';
import BetsContainer from 'ui/organisms/BetsContainer';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Inventory from 'ui/organisms/Inventory';
import SteamInventoryPopup from 'ui/organisms/SteamInventoryPopup';
// @todo Все экшены брать из контекста App (примерно так)
import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';
import { Container } from 'ui/organisms/BetMaker/styled';
import { usePopupsActions } from 'src/redux/user/hooks/actions';
import classicLogoSvg from 'src/resources/svg/classic-logo.svg';
import GameWidgets from 'ui/organisms/GameWidgets';
import { mapStateToProps, mapDispatchToProps } from './connect';

function Lottery({
    id,
    time,
    hash,
    secret,
    bets,
    users,
    bank,
    addBet,
    isShowWinner,
    roulette,
    userChance,
    userItemsCount,
}) {
    const isAuth = useSelector((state) => Boolean(state.user.token));

    const actions = {
        user: useActions(userActions),
        game: useActions(gameActions),
        betMaker: useActions(betMakerActions),
    };

    const popupActions = usePopupsActions();

    return (
        <DefaultTemplate widgets={<GameWidgets />}>
            <RoomNavigation
                svgId="classic-logo"
                svg={classicLogoSvg}
                url="/game/lottery"
                title="Лотерея"
                subPages={[{ name: 'history', title: 'История', url: '/game/lottery/history' }]}
                currentPage={null}
            />
            
            <GameInfo
                id={id}
                time={time}
                bets={bets}
                bank={bank}
                users={users}
                roulette={roulette}
                isShowWinner={isShowWinner}
                openBetMaker={actions.betMaker.open}
                isAuth={isAuth}
            />

            <BetMaker />

            <GameControls
                isVisible={!roulette.isVisible}
                percent={userChance}
                itemsCount={userItemsCount}
                addBet={addBet}
                openBetMaker={actions.betMaker.open}
                isAuth={isAuth}
            />
            {/* <Inventory /> */}

            <UsersBanks
                users={users}
                bank={bank}
                bets={bets}
            />

            <GameEndFooter
                isVisible={isShowWinner}
                secret={secret}
            />

            <BetsContainer
                bets={bets}
                isGameEnd={isShowWinner}
            />

            <GameBeginFooter
                hash={hash}
            />
            <SteamInventoryPopup />

        </DefaultTemplate>
    );
}

Lottery.propTypes = {
    token: PropTypes.string.isRequired,
    subscribe: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    join: PropTypes.func.isRequired,
};

Lottery.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Lottery);

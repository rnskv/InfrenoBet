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


// @todo Все экшены брать из контекста App (примерно так)
import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';
import { mapStateToProps, mapDispatchToProps } from './connect';

function Lottery({

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

    return (
        <DefaultTemplate>
            <RoomNavigation
                svgId="classic-logo"
                url="/game/lottery"
                title="Лотерея"
            />
            <GameInfo
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

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useActions } from 'src/helpers/hooks';

import DefaultTemplate from 'ui/templates/Default';
import UsersBanks from 'ui/organisms/UsersBanks';
import GameInfo from 'ui/organisms/GameInfo';
import GameBeginFooter from 'ui/organisms/GameBeginFooter';
import GameControls from 'ui/organisms/GameControls';
import GameEndFooter from 'ui/organisms/GameEndFooter';
import BetMaker from 'ui/organisms/BetMaker';
import TransactionsContainer from 'ui/organisms/TransactionsContainer';
import RoomNavigation from 'ui/organisms/RoomNavigation';

import { mapStateToProps, mapDispatchToProps } from './connect';

//@todo Все экшены брать из контекста App (примерно так)
import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';

function Main({
    time,
    hash,
    secret,
    transactions,
    users,
    bank,
    transaction,
    isShowWinner,
    roulette,
    userChance,
    userItemsCount,
}) {

    const actions = {
        user: useActions(userActions),
        game: useActions(gameActions),
        betMaker: useActions(betMakerActions),
    };

    console.log('userActions', actions.betMaker.open)
    return (
        <DefaultTemplate>
            <RoomNavigation />
            <GameInfo
                time={time}
                transactions={transactions}
                bank={bank}
                users={users}
                roulette={roulette}
                isShowWinner={isShowWinner}
                openBetMaker={actions.betMaker.open}
            />
            <BetMaker />

            <GameControls
                isVisible={!roulette.isVisible}
                percent={userChance}
                itemsCount={userItemsCount}
                transaction={transaction}
                openBetMaker={actions.betMaker.open}
            />

            <UsersBanks
                users={users}
                bank={bank}
                transactions={transactions}
            />

            <GameEndFooter
                isVisible={isShowWinner}
                secret={secret}
            />

            <TransactionsContainer
                transactions={transactions}
                isGameEnd={isShowWinner}
            />

            <GameBeginFooter
                hash={hash}
            />
        </DefaultTemplate>
    );
}

Main.propTypes = {
    token: PropTypes.string.isRequired,
    subscribe: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    join: PropTypes.func.isRequired,
};

Main.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { infernoClient } from 'src/index';

import DefaultTemplate from 'ui/templates/Default';
import UsersBanks from 'ui/organisms/UsersBanks';
import GameInfo from 'ui/organisms/GameInfo';
import GameBeginFooter from 'ui/organisms/GameBeginFooter';
import GameControls from 'ui/organisms/GameControls';
import GameEndFooter from 'ui/organisms/GameEndFooter';
import BetMaker from 'ui/organisms/BetMaker';
import TransactionsContainer from 'ui/organisms/TransactionsContainer';

import { mapStateToProps, mapDispatchToProps } from './connect';


const isSubscribed = false;

function Main({
    time,
    hash,
    secret,
    transactions,
    users,
    join,
    bank,
    transaction,
    subscribe,
    token,
    transactionsPoolLength,
    isWaitingTransactions,
    isShowWinner,
    userDepositsCount,
    roulette,
    notifications,
    openBetMaker,
    getProfile,
    profile,
    sidebars,
    userChance,
    userItemsCount,
    logOut,
}) {
    useEffect(() => {
        if (isSubscribed) return;
        subscribe();
        // getProfile();
    }, []);

    return (
        <DefaultTemplate>
            {/* { profile.isLoading ? 'Профиль подгружается' : `${profile.name} - ${profile.balance} рублей`} */}
            {/* { `Ожидаем транзакции: ${isWaitingTransactions} - ${transactionsPoolLength} - штук`} */}
            {/* <button onClick={logOut}>exit</button> */}
            <GameInfo
                time={time}
                transactions={transactions}
                bank={bank}
                users={users}
                roulette={roulette}
                isShowWinner={isShowWinner}
            />
            <BetMaker />
            { !isShowWinner ? (
                <GameControls
                    percent={userChance}
                    itemsCount={userItemsCount}
                    transaction={transaction}
                    openBetMaker={openBetMaker}
                />
            ) : null }

            <UsersBanks users={users} bank={bank} />
            { isShowWinner ? <GameEndFooter secret={secret} /> : null }
            <div>
                <TransactionsContainer
                    transactions={transactions}
                    isGameEnd={isShowWinner}
                />
            </div>
            <GameBeginFooter hash={hash} />
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

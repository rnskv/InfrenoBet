import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInDown } from 'react-animations';

import Button from 'ui/atoms/Button';
import DefaultTemplate from 'ui/templates/Default';


import Transaction from 'ui/molecules/Transaction';

import { rootApi } from 'src/redux/root/api';
import UsersBanks from 'ui/organisms/UsersBanks';
import GameInfo from 'ui/organisms/GameInfo';
import GameBeginFooter from 'ui/organisms/GameBeginFooter';
import GameControls from 'ui/organisms/GameControls';
import GameEndFooter from 'ui/organisms/GameEndFooter';
import BetMaker from 'ui/organisms/BetMaker';
import TransactionsContainer from 'ui/organisms/TransactionsContainer';

import { mapStateToProps, mapDispatchToProps } from './connect';

rootApi.setBearerFromLocalStorage();

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
}) {
    useEffect(() => {
        if (isSubscribed) return;
        console.log('subscribed');
        subscribe();
        getProfile();
    }, []);
    return (
        <DefaultTemplate>
            {/*{ profile.isLoading ? 'Профиль подгружается' : `${profile.name} - ${profile.balance} рублей`}*/}
            {/*{ `Ожидаем транзакции: ${isWaitingTransactions} - ${transactionsPoolLength} - штук`}*/}
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

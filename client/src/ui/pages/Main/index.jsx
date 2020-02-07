import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/atoms/Button';
import DefaultTemplate from 'ui/templates/Default';



import Transaction from 'ui/molecules/Transaction';

import { rootApi } from 'src/redux/root/api';
import { mapStateToProps, mapDispatchToProps } from './connect';
import UsersBanks from 'ui/organisms/UsersBanks';
import GameInfo from 'ui/organisms/GameInfo';
import GameFooter from 'ui/organisms/GameFooter';
import GameControls from 'ui/organisms/GameControls';

rootApi.setBearerFromLocalStorage();

const handler = async () => {
    const result = await rootApi.execute('test');
    alert(result.body);
};

const isSubscribed = false;

function Main({
    time,
    hash,
    secret,
    transactions,
    winner,
    users,
    join,
    bank,
    transaction,
    subscribe,
    token,
    transactionsPoolLength,
    isWaitingTransactions,
    isRouletteStart,
    isShowWinner
}) {
    useEffect(() => {
        if (isSubscribed) return;
        console.log('subscribed');
        subscribe();
    }, []);
    return (
        <DefaultTemplate>
            <GameInfo
                time={time}
                isRouletteStart={isRouletteStart}
                isShowWinner={isShowWinner}
                transactions={transactions}
                bank={bank}
                winner={winner}
            />
            {/*<div>*/}
            {/*    { !token ? <Link to="/login">Go to login</Link> : token}*/}
            {/*</div>*/}
            {/*<Button onClick={handler}>Test action with token</Button>*/}
            {/*<br />*/}
            {/*<br />*/}
            {/*<p>*/}
            {/*    Время до конца -*/}
            {/*    { time }*/}
            {/*</p>*/}

            {/*{*/}
            {/*    isWaitingTransactions ? `Не все транзакции этой игры обработаны, в очереди на обработку еще ${ transactionsPoolLength } траназкции` : '123123'*/}
            {/*}*/}

            {/*<p>*/}
            {/*    Хэш раунда -*/}
            {/*    { hash }*/}
            {/*</p>*/}

            {/*<p>*/}
            {/*    Победитель раунда -*/}
            {/*    { winner.transaction && winner.transaction.user.name }*/}
            {/*</p>*/}

            {/*<p>*/}
            {/*    Победный билет -*/}
            {/*    { winner && winner.ticket }*/}
            {/*</p>*/}

            {/*<p>*/}
            {/*    Секретно число раунда -*/}
            {/*    { secret || 'secret'}*/}
            {/*</p>*/}
            {/*<div>*/}
            {/*    { `Банк игры ${ bank.total } рублей` }*/}
            {/*</div>*/}
            <GameControls
                transaction={transaction}
            />
            <UsersBanks users={users} bank={bank} />
            <div>
                {
                    transactions.map((transaction, index) => (
                        <Transaction
                            key={transaction.id}
                            index={index}
                            user={transaction.user}
                            value={transaction.value}
                            ticketFrom={transaction.ticketFrom}
                            ticketTo={transaction.ticketTo}
                        />
                    ))
                }
            </div>
            <GameFooter hash={hash}/>
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

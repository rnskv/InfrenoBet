import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { getFormattedTime, getExchangedSum } from 'src/helpers/system';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import {
    Container,
    WinnerTicket,
    WinnerName,
    Winner,
    WinnerItem,
    NextGame,
    Arrow,
    Timer,
    TimerNumbers,
    BankNumbers,
    DepositButton,
} from './styled';

function WinInfo({ isShowWinner, winner, totalBank, isVisible, time, openBetMaker, isAuth }) {
    if (!isVisible) return null;
    return (
        <Container>
            <NotAuthPlaceHolder isVisible={!isAuth}/>
            <Winner>
                <WinnerTicket>
                    Победный билет:
                    <span>{ isShowWinner ? `#${winner.ticket}` : '???' }</span>
                </WinnerTicket>
                <WinnerName>
                    Победитель:
                    <span>{ isShowWinner ? winner.bet.user.name : '???'}</span>
                </WinnerName>

                <BankNumbers>{getExchangedSum(totalBank)}</BankNumbers>
            </Winner>
            <Arrow />

            {isShowWinner ? (
                <WinnerItem>
                    { console.log('winner', winner) }
                    <img alt="Winner item" src={winner.bet.item.image} />
                </WinnerItem>
            ) : null}

            <NextGame>
                <Timer>
                    <span>Новая игра через:</span>
                    <TimerNumbers>{ getFormattedTime(time, { minutes: false }) }</TimerNumbers>
                </Timer>
                <DepositButton onClick={openBetMaker}>Сделать ставку</DepositButton>
            </NextGame>
        </Container>
    );
}

WinInfo.propTypes = {
    isShowWinner: PropTypes.bool.isRequired,
    openBetMaker: PropTypes.func.isRequired,
    winner: PropTypes.object,
    isVisible: PropTypes.bool,
    totalBank: PropTypes.number,
    time: PropTypes.number,
};

WinInfo.defaultProps = {
    isVisible: false,
    totalBank: 0,
    time: 0,
    winner: {
        ticket: 0,
        bet: {
            value: 1,
            user: {
                name: 'Unknown',
            },
        },
    },
};

export default WinInfo;

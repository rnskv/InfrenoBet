import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { getFormattedTime } from 'src/helpers/system';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

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

function WinInfo({ isShowWinner, winner, totalBank, isVisible, time, openBetMaker }) {
    if (!isVisible) return null;
    return (
        <Container>
            <Winner>
                <WinnerTicket>
                    Победный билет:
                    <span>{ isShowWinner ? `#${winner.ticket}` : '???' }</span>
                </WinnerTicket>
                <WinnerName>
                    Победитель:
                    <span>{ isShowWinner ? winner.transaction.user.name : '???'}</span>
                </WinnerName>

                <BankNumbers>{`${totalBank.toFixed(2)}₽`}</BankNumbers>
            </Winner>
            <Arrow />

            {isShowWinner ? (
                <WinnerItem>
                    <img src={`https://d2lomvz2jrw9ac.cloudfront.net/common/currency/${winner.transaction.value}.png`} />
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
        transaction: {
            value: 1,
            user: {
                name: 'Unknown',
            },
        },
    },
};

export default WinInfo;

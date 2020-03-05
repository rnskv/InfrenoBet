import PropTypes from 'prop-types';

import React, { useRef } from 'react';

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
} from './styled';

function WinInfo({ isShowWinner, winner }) {
    console.log(winner);
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
            </Winner>
            <Arrow />

            {isShowWinner ? (
                <WinnerItem>
                    <img src={`https://d2lomvz2jrw9ac.cloudfront.net/common/currency/${winner.transaction.value}.png`} />
                </WinnerItem>
            ) : null}

            <NextGame>
                {/*//asdasd*/}
            </NextGame>
        </Container>
    );
}

WinInfo.propTypes = {
    winner: PropTypes.object,
    isShowWinner: PropTypes.isRequired,
};

WinInfo.defaultProps = {
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

import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';
import Roulette from 'ui/organisms/Roulette';

import {
    Container,
    Title,
    ItemsCount,
    Bank,
    Timer,
    StartGame,
    Or,
} from './styled';

function getFormattedTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes >= 10 ? minutes : `0${minutes}`} : ${seconds >= 10 ? seconds : `0${seconds}`}`;
}

function GameInfo({
    id, time, transactions, bank, winner, isRouletteStart, isShowWinner, users, avatars
}) {
    return (
        <Container>
            <Title>{`Игра ${id}`}</Title>
            {/*<Roulette*/}
            {/*    transactions={transactions}*/}
            {/*    bank={bank}*/}
            {/*    winner={winner}*/}
            {/*    users={users}*/}
            {/*    avatars={avatars}*/}
            {/*/>*/}
            {
                isRouletteStart
                    ? <Roulette
                        transactions={transactions}
                        bank={bank}
                        winner={winner}
                        users={users}
                        avatars={avatars}
                    />
                    : (
                        <StartGame>
                            <ItemsCount> {transactions.length} / 50 </ItemsCount>
                            <Or>или</Or>
                            <Timer>
                                { getFormattedTime(time) }
                            </Timer>
                        </StartGame>
                    )
            }
            <Bank>
                { `В банке: ` }
                <span>{bank.total}₽</span>
            </Bank>

            {
                isShowWinner ? <WinInfo winner={winner}/> : null
            }
        </Container>
    );
}

GameInfo.propTypes = {
};

export default GameInfo;

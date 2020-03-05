import PropTypes from 'prop-types';

import React, { useRef } from 'react';
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
    id, time, transactions, bank, users, roulette, isShowWinner,
}) {
    return (
        <Container>
            <Title>{`Игра ${id}`}</Title>
            {
                roulette.isVisible
                    ? (
                        <Roulette
                            transactions={transactions}
                            bank={bank}
                            users={users}
                            state={roulette}
                        />
                    )
                    : (
                        <StartGame>
                            <ItemsCount>
                                { `${transactions.length} / 50` }
                            </ItemsCount>
                            <Or>или</Or>
                            <Timer>
                                { getFormattedTime(time) }
                            </Timer>
                        </StartGame>
                    )
            }
            {!roulette.isVisible ? (
                <Bank>
                    {'На кону: '}
                    <span>
                        {`${bank.total}₽`}
                    </span>
                </Bank>
            )
                : null}

            {
                roulette.isVisible ? <WinInfo isShowWinner={isShowWinner} winner={roulette.winner} /> : null
            }
        </Container>
    );
}

GameInfo.propTypes = {
};

export default GameInfo;

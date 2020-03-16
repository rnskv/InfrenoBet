import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import WinInfo from 'ui/organisms/WinInfo';
import Roulette from 'ui/organisms/Roulette';

import { getFormattedTime, getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Title,
    ItemsCount,
    Bank,
    Timer,
    StartGame,
    Or,
    ItemsCountValue,
    ItemsText,
} from './styled';

function GameInfo({
    id, time, bets, bank, users, roulette, isShowWinner, isVisible, openBetMaker, isAuth,
}) {
    return (
        <Container>
            <Title>{`Игра #${id}`}</Title>
            <Roulette
                bets={bets}
                bank={bank}
                users={users}
                state={roulette}
            />
            {

                roulette.isVisible
                    ? null
                    : (
                        <StartGame>
                            <ItemsCount>
                                <ItemsCountValue
                                    percent={Math.round(bets.length / 50 * 100)}
                                />
                                <ItemsText>
                                    { `${bets.length} / 50` }
                                    <span>предметов</span>
                                </ItemsText>
                            </ItemsCount>
                            <Or>или</Or>
                            <Timer>
                                { getFormattedTime(time) }
                            </Timer>
                        </StartGame>
                    )
            }

            <Bank hidden={roulette.isVisible}>
                {'На кону: '}
                <span>
                    { getExchangedSum(bank.total) }
                </span>
            </Bank>

            <WinInfo
                isVisible={roulette.isVisible}
                isShowWinner={isShowWinner}
                winner={roulette.winner}
                totalBank={bank.total}
                time={time}
                openBetMaker={openBetMaker}
                isAuth={isAuth}
            />
        </Container>
    );
}

GameInfo.propTypes = {
    id: PropTypes.number,
    openBetMaker: PropTypes.func.isRequired,
};


GameInfo.defaultProps = {
    id: 100500,
};

export default GameInfo;

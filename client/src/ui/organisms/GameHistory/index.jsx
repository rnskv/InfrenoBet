import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import WinInfo from 'ui/organisms/WinInfo';
import Roulette from 'ui/organisms/Roulette';
import { getGameBank } from 'shared/helpers/game';
import { getFormattedTime, getExchangedSum, getTimeFromNow } from 'src/helpers/system';
import { getUniqueObjectsInArray } from 'shared/helpers/system';
import UsersBanks from 'ui/organisms/UsersBanks';
import BetItems from 'ui/molecules/BetItems';
import {
    Container,
    Horizontal,
    Nickname,
    Information,
    GameId,
    Date,
    Cash,
    Text,
    Items,
    Block,
    StyledAvatar,
    Chances,
} from './styled';

function GameHistory({ game }) {
    if (!game.winner) { return <div>Игра не завершена</div>; }

    const { bets } = game;
    const items = game.bets.map((bet) => bet.item);
    const bank = getGameBank(bets);
    const users = getUniqueObjectsInArray(game.bets.map((bet) => bet.user), '_id');
    const winnerBet = bank.users[game.winner._id];

    return (
        <Container>
            <Horizontal>
                <Nickname>
                    Победитель:
                    <span>{game.winner.name}</span>
                </Nickname>
                <Information>
                    <GameId>
                        { `ID игры: ${game._id}` }
                    </GameId>
                    <Date>{ getTimeFromNow(game.createDate)}</Date>
                </Information>
            </Horizontal>
            <Horizontal>
                <Block>
                    <StyledAvatar src={game.winner.avatar} />
                    <Cash>
                        <Text>
                            Выигрыш:
                            <span data-color="yellow">
                                <b>{ getExchangedSum(bank.total) }</b>
                            </span>
                        </Text>
                        <Text>
                            Шанс:
                            <span data-color="blue">
                                <b>
                                    { winnerBet / bank.total * 100 }
%
                                </b>
                            </span>
                        </Text>
                    </Cash>
                </Block>
                <Block>
                    <Cash>
                        <Text>
                            { 'Хэш раунда:' }
                            <span data-color="blue">{ game.hash }</span>
                        </Text>
                        <Text>
                            { 'Число раунда:' }
                            <span data-color="blue">{ game.secret }</span>
                        </Text>
                    </Cash>
                </Block>
            </Horizontal>
            <Chances>
                <UsersBanks users={users} bank={bank} bets={bets} />
            </Chances>
            <Items>
                <h3>Выигрыш без учёта комиссии:</h3>
                <BetItems
                    useExtendedView
                    items={items}
                    emptyCellsCount={0}
                />
            </Items>
        </Container>
    );
}

GameHistory.propTypes = {

};


GameHistory.defaultProps = {
};

export default GameHistory;

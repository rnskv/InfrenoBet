import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import UserBank from 'ui/molecules/UserBank';

import { getBetChances, getUserChances, getUserColorsById } from 'src/helpers/system';

import {
    Container,
    ChancesBar,
    Chance,
    Banks,
} from './styled';

function UsersBanks({ users, bank, bets }) {
    const optimizedBets = [];

    let lastBet = null;
    let currentIndex = -1;

    for (const bet of bets) {
        if (!lastBet || lastBet.user._id !== bet.user._id) {
            currentIndex += 1;
        }

        optimizedBets[currentIndex] = optimizedBets[currentIndex]
            ? {
                chance: optimizedBets[currentIndex].chance + getBetChances(bet, bank),
                color: getUserColorsById(bet.user._id),
            }
            : {
                chance: getBetChances(bet, bank),
                color: getUserColorsById(bet.user._id),
            };

        lastBet = bet;
    }

    console.log(optimizedBets);

    return (
        users.length ? (
            <Container>
                <ChancesBar>
                    {optimizedBets.map((bet, index) => (
                        <Chance
                            key={`${bet.color}${bet.chance}${index}`}
                            color={bet.color.defaultColor}
                            percent={bet.chance || 0}
                        />
                    ))}
                </ChancesBar>
                <Banks>
                    {
                        users.map((user) => {
                            const { lightColor, darkColor } = getUserColorsById(user._id);

                            return (
                                <UserBank
                                    key={user._id}
                                    avatar={user.avatar}
                                    percent={getUserChances(user, bank) || 0}
                                    value={bank.users[user._id] || 10}
                                    containerColor={lightColor}
                                    borderColor={darkColor}
                                />
                            );
                        })
                    }
                </Banks>
            </Container>
        ) : null
    );
}

UsersBanks.propTypes = {
    users: PropTypes.array.isRequired,
    bank: PropTypes.object.isRequired,
    bets: PropTypes.array.isRequired,
};

export default UsersBanks;

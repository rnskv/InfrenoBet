import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import UserBank from 'ui/molecules/UserBank';

import { getBetChances, getUserChances, getUserColorsByEmail } from 'src/helpers/system';

import {
    Container,
    ChancesBar,
    Chance,
    Banks,
} from './styled';

function UsersBanks({ users, bank, bets }) {
    return (
        users.length ? (
            <Container>
                <ChancesBar>
                    {bets.map((bet, index) => {
                        const { user } = bet;
                        const { defaultColor } = getUserColorsByEmail(user.email);

                        return (
                            <Chance
                                key={`${defaultColor}${bet._id}`}
                                color={defaultColor}
                                percent={getBetChances(bet, bank) || 0}
                            />
                        );
                    })}
                </ChancesBar>
                <Banks>
                    {
                        users.map((user, index) => {
                            const { lightColor, darkColor } = getUserColorsByEmail(user.email);

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

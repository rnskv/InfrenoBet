import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import UserBank from 'ui/molecules/UserBank';

import { getTransactionChances, getUserChances, getUserColorsByEmail } from 'src/helpers/system';

import {
    Container,
    ChancesBar,
    Chance,
    Banks,
} from './styled';

function UsersBanks({ users, bank, transactions }) {
    console.log(transactions)
    return (
        users.length ? (
            <Container>
                <ChancesBar>
                    {transactions.map((transaction, index) => {
                        const { user } = transaction;
                        const { defaultColor } = getUserColorsByEmail(user.email);

                        return (
                            <Chance
                                key={`${defaultColor}${transaction._id}`}
                                color={defaultColor}
                                percent={getTransactionChances(transaction, bank)}
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
                                    percent={getUserChances(user, bank)}
                                    bet={bank.users[user._id]}
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
    transactions: PropTypes.array.isRequired,
};

export default UsersBanks;

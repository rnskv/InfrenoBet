import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import UserBank from 'ui/molecules/UserBank';

import { getUserChances, getUserColorsByEmail } from 'src/helpers/system';

import {
    Container,
    ChancesBar,
    Chance,
    Banks,
} from './styled';

function UsersBanks({ users, bank }) {
    return (
        users.length ? (
            <Container>
                <ChancesBar>
                    {users.map((user, index) => {
                        const { defaultColor } = getUserColorsByEmail(user.email);

                        return (
                            <Chance
                                key={defaultColor}
                                color={defaultColor}
                                percent={getUserChances(user, bank)}
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
};

export default UsersBanks;

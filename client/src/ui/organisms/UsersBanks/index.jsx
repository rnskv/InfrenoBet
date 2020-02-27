import PropTypes from 'prop-types';
import crypto from 'crypto';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

import {
    Container,
    ChancesBar,
    Chance,
    Banks,
} from './styled';

function getUserChances(bank, user) {
    return (bank.users[user._id] / bank.total * 100).toFixed(2);
}

function UsersBanks({ users, bank }) {
    return (
        users.length ? (
            <Container>
                <ChancesBar>
                    {users.map((user, index) => {
                        console.log(user)
                        const nicknameHash = crypto.createHash('md5').update(String(user.email)).digest('hex');
                        const color = `#${nicknameHash.slice(0, 6)}`;

                        return (
                            <Chance
                                color={color}
                                percent={getUserChances(bank, user)}
                            />
                        );
                    })}
                </ChancesBar>
                <Banks>
                    {
                        users.map((user, index) => (
                            <UserBank
                                key={user._id}
                                user={user}
                                bank={bank}
                            />
                        ))
                    }
                </Banks>
            </Container>
        ) : null
    );
}

UsersBanks.propTypes = {
};

export default UsersBanks;

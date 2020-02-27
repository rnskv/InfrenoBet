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
                        console.log(user);
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
                        users.map((user, index) => {
                            const nicknameHash = crypto.createHash('md5').update(String(user.email)).digest('hex');
                            const containerColor = `#${nicknameHash.slice(0, 6)}59`;
                            const borderColor = `#${nicknameHash.slice(0, 6)}db`;

                            return (
                                <UserBank
                                    key={user._id}
                                    avatar={user.avatar}
                                    chance={getUserChances(bank, user)}
                                    bet={bank.users[user._id]}
                                    containerColor={containerColor}
                                    borderColor={borderColor}
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
};

export default UsersBanks;

import PropTypes from 'prop-types';
import crypto from 'crypto';

import React from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Avatar from 'ui/atoms/Avatar';

import {
    Container,
    Chance,
    Bet,
} from './styled';

function getUserChances(bank, user) {
    return (bank.users[user._id] / bank.total * 100).toFixed(2);
}

function UserBank({
    user, bank,
}) {
    const nicknameHash = crypto.createHash('md5').update(String(user.email)).digest('hex');
    const containerColor = `#${nicknameHash.slice(0, 6)}59`;
    const borderColor = `#${nicknameHash.slice(0, 6)}db`;

    return (
        <Container containerColor={containerColor} borderColor={borderColor}>
            <Avatar src={user.avatar} />
            <Chance>
                { `${getUserChances(bank, user)}%` }
            </Chance>
            <Bet>
                { `${bank.users[user._id]}₽` }
            </Bet>
        </Container>
    );
}

UserBank.propTypes = {
};

export default UserBank;

import PropTypes from 'prop-types';

import React from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';

import {
    Container,
    Avatar,
    Chance,
    Bet,
    TextAvatar,
} from './styled';

function getUserChances(bank, user) {
    return (bank.users[user._id] / bank.total * 100).toFixed(2);
}

function UserBank({
    user, bank,
}) {
    return (
        <Container>
            <TextAvatar>
                {user.name[0]}
            </TextAvatar>
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

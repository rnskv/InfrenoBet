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

function UserBank({
    avatar, bet, chance, containerColor, borderColor
}) {

    return (
        <Container containerColor={containerColor} borderColor={borderColor}>
            <Avatar src={avatar} />
            <Chance>
                { `${chance}%` }
            </Chance>
            <Bet>
                { `${bet}₽` }
            </Bet>
        </Container>
    );
}

UserBank.propTypes = {
};

export default UserBank;

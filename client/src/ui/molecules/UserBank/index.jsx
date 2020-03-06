import PropTypes from 'prop-types';

import React from 'react';
import Avatar from 'ui/atoms/Avatar';

import {
    Container,
    Chance,
    Bet,
} from './styled';

function UserBank({
    avatar, bet, percent, containerColor, borderColor,
}) {
    return (
        <Container containerColor={containerColor} borderColor={borderColor}>
            <Avatar src={avatar} />
            <Chance>
                { `${percent}%` }
            </Chance>
            <Bet>
                { `${bet}₽` }
            </Bet>
        </Container>
    );
}

UserBank.propTypes = {
    avatar: PropTypes.string.isRequired,
    bet: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    containerColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
};

export default UserBank;

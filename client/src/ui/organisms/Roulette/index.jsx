import PropTypes from 'prop-types';

import React, { useRef, useState } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

import {
    Container,
    WinnerTicket,
    WinnerName,
    Winner,
    Avatars,
    Arrow
} from './styled';

function Roulette({ winner, users, bank, avatars }) {

    const [isRotate, setIsRotate] = useState(false)
    // avatars[3] = winner.transaction.user.avatar;
    console.log('avatars', avatars, winner);
    setTimeout(() => {
        setIsRotate(true);
    }, 100)

    // const mock = new Array(300).fill(`https://sun1-17.userapi.com/c854028/v854028822/1a57f2/28Zbg1V2v7U.jpg?ava=1`)
    return (
        <Container>
            <Avatars isRotate={isRotate}>
                {
                    avatars.map((avatar) => <img src={avatar} />)
                }
            </Avatars>
            <Arrow />
        </Container>
    );
}

Roulette.propTypes = {
};

export default Roulette;

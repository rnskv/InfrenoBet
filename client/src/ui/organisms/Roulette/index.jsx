import PropTypes from 'prop-types';

import React, { useRef, useState, useEffect } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

import {
    Container,
    WinnerTicket,
    WinnerName,
    Winner,
    Avatars,
    Arrow,
} from './styled';

const Roulette = React.memo(({
    state,
}) => {
    const avatarsRef = useRef(null);

    useEffect(() => {
        avatarsRef.current.style.marginLeft = -state.offset + 400 + 'px';
    }, [state.offset]);

    return (
        <Container>
            <Avatars ref={avatarsRef}>
                {
                    state.avatars.map((avatar, index) => <img key={index} src={avatar} />)
                }
            </Avatars>
            <Arrow />
        </Container>
    );
}, (prevProps) => !!prevProps.offset);

Roulette.propTypes = {
};

export default Roulette;

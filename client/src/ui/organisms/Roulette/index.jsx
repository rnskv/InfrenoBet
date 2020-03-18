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
    Avatar,
} from './styled';

const Roulette = React.memo(({
    state,
}) => {
    const avatarsRef = useRef(null);
    const containerRef = useRef(null);

    const preloadedAvatars = state.avatars.map((avatar, index) => (
        <Avatar key={index}>
            <img src={avatar} />
        </Avatar>
    ));

    return (
        <Container ref={containerRef} isVisible={state.isVisible}>
            <Avatars ref={avatarsRef} offset={state.offset}>
                {
                    [preloadedAvatars]
                }
            </Avatars>
            <Arrow />
        </Container>
    );
}, (prevProps) => !!prevProps.offset);

Roulette.propTypes = {
};

export default Roulette;

import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';

import {
    Container,
    WinnerTicket,
    WinnerName,
    Winner
} from './styled';

function WinInfo({ winner }) {
    return (
        <Container>
            <Winner>
                <WinnerTicket>
                    Победный билет: <span>{ winner.ticket }</span>
                </WinnerTicket>
                <WinnerName>
                    Победитель: <span>{ winner.transaction.user.name }</span>
                </WinnerName>
            </Winner>
        </Container>
    );
}

WinInfo.propTypes = {
};

export default WinInfo;

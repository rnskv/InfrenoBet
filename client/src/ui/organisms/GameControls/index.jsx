import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Container,
} from './styled';

function GameFooter({ transaction }) {
    return (
        <Container>
            <Button onClick={transaction}>Make transaction</Button>
        </Container>
    );
}

GameFooter.propTypes = {
};

export default GameFooter;

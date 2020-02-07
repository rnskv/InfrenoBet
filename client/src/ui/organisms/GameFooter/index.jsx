import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Container,
    Title,
    FairGame
} from './styled';

function GameFooter({ hash }) {
    return (
        <Container>
            <Title>ИГРА НАЧАЛАСЬ, ПОКУПАЙТЕ БИЛЕТЫ!</Title>
            <FairGame>
                <div>Честная игра</div>
                <span>
                    Хэш игры md5: { hash }
                </span>
            </FairGame>
        </Container>
    );
}

GameFooter.propTypes = {
};

export default GameFooter;

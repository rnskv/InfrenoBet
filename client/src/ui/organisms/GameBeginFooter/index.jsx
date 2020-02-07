import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Footer,
    FairGame
} from './styled';


function GameBeginFooter({ children, text, hash, position }) {
    return (
        <Footer text="ИГРА НАЧАЛАСЬ, ПОКУПАЙТЕ БИЛЕТЫ!">
            <FairGame>
                <div>Честная игра</div>
                <span>
                    Хэш игры md5: { hash }
                </span>
            </FairGame>
        </Footer>
    );
}

GameBeginFooter.propTypes = {
};

export default GameBeginFooter;

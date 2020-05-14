import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Footer,
    FairGame,
    Icon
} from './styled';


function GameBeginFooter({
    children, text, hash, position,
}) {
    return (
        <Footer
            icon={<Icon />}
            text="ИГРА НАЧАЛАСЬ, УДАЧИ!"
        >
            <FairGame href="http://www.md5.cz/" target="_blank">
                <div>Честная игра</div>
                <span>
                    Хэш игры md5:
                    <b>#{ hash }</b>
                </span>
            </FairGame>
        </Footer>
    );
}

GameBeginFooter.propTypes = {
};

export default GameBeginFooter;

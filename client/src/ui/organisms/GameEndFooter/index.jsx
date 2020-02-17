import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import UserBank from 'ui/molecules/UserBank';
import WinInfo from 'ui/organisms/WinInfo';

import {
    Footer,
    Secret,
} from './styled';


function GameEndFooter({ secret }) {
    return (
        <Footer text="ИГРА ЗАКОНЧИЛАСЬ!">
            <Secret>
Число этого раунда -
                {secret}
            </Secret>
        </Footer>
    );
}

GameEndFooter.propTypes = {
};

export default GameEndFooter;

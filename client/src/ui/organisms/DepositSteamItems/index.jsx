import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';
import DepositCoins from 'ui/organisms/DepositCoins';
import VerifyAge from 'ui/molecules/VerifyAge';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { infernoClient } from 'src/index';

import SteamInventory from 'ui/organisms/SteamInventory';
import {
    Container,
    InputContainer,
    StyledButton,
} from './styled';

const { redirectToFreekassa } = infernoClient.modules.store.domains.cashier;
const { changeValue } = infernoClient.modules.store.actions.cashier;


function DepositSteamItems() {
    return (
        <Container>
            <NotAuthPlaceHolder isVisible={false} />
            <SteamInventory isPopup={false} />
        </Container>
    );
}

DepositSteamItems.propTypes = {

};

DepositSteamItems.defaultProps = {

};

export default DepositSteamItems;

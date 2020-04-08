import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import DepositCreditCards from 'ui/organisms/DepositCreditCards';
import DepositSteamItems from 'ui/organisms/DepositSteamItems';

import Sidebar from 'ui/organisms/Sidebar';
import {
    Container,
    NotFound,
} from './styled';

const TAB_COMPONENT = {
    FREE_KASSA: DepositCreditCards,
    STEAM_ITEMS: DepositSteamItems,
};

function DepositSelector({
}) {
    const isAuth = useSelector((state) => !!state.user.token);
    const activeDepositTabName = useSelector((state) => state.cashier.activeDepositTabName);
    const Tab = TAB_COMPONENT[activeDepositTabName];

    if (!Tab) {
        return (
            <Container>
                <NotFound>Платежный метод не доступен</NotFound>
            </Container>
        );
    }

    return (
        <Container>
            <NotAuthPlaceHolder isVisible={!isAuth} />
            <Tab />
        </Container>
    );
}

DepositSelector.propTypes = {

};

DepositSelector.defaultProps = {

};

export default DepositSelector;

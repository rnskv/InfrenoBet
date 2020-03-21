import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import DepositCreditCards from 'ui/organisms/DepositCreditCards';

import {
    Container,
} from './styled';

const TAB_COMPONENT = {
    CREDIT_CARDS: DepositCreditCards,
};

function DepositSelector({
}) {
    const activeTabName = useSelector((state) => state.cashier.activeTabName);
    const Tab = TAB_COMPONENT[activeTabName];

    return (
        <Container>
            { <Tab /> || <div>Платежный метод не выбран</div>}
        </Container>
    );
}

DepositSelector.propTypes = {

};

DepositSelector.defaultProps = {

};

export default DepositSelector;

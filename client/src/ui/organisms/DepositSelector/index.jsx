import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import DepositCreditCards from 'ui/organisms/DepositCreditCards';

import {
    Container,
    NotFound
} from './styled';
import Sidebar from 'ui/organisms/Sidebar';

const TAB_COMPONENT = {
    CREDIT_CARDS: DepositCreditCards,
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
            <a href="//showstreams.tv/" style={{ textAlign: 'center', margin: '25px 0', display: 'block' }}>
                <img src="//www.free-kassa.ru/img/fk_btn/17.png" title="Бесплатный видеохостинг" />
            </a>
        </Container>
    );
}

DepositSelector.propTypes = {

};

DepositSelector.defaultProps = {

};

export default DepositSelector;

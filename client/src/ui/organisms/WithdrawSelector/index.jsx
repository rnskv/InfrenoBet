import PropTypes from 'prop-types';

import React from 'react';
import SVG from 'svg-inline-react';

import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import DepositCreditCards from 'ui/organisms/DepositCreditCards';
import chooseSvg from 'src/resources/svg/choose.svg';
import WithdrawQiwi from 'ui/organisms/WithdrawQiwi';

import {
    Container,
    NotFound
} from './styled';

const TAB_COMPONENT = {
    QIWI: WithdrawQiwi,
};

function WithdrawSelector({
}) {
    const isAuth = useSelector((state) => !!state.user.token);
    const activeWithdrawTabName = useSelector((state) => state.cashier.activeWithdrawTabName);
    const Tab = TAB_COMPONENT[activeWithdrawTabName];

    if (activeWithdrawTabName === '') {
        return (
            <Container>
                <NotFound>
                    <SVG src={chooseSvg} />
                    <span>Выберите платежную систему</span>
                </NotFound>
            </Container>
        );
    }

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

WithdrawSelector.propTypes = {

};

WithdrawSelector.defaultProps = {

};

export default WithdrawSelector;

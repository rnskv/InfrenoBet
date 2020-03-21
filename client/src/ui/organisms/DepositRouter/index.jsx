import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import CreditCardsSvg from 'src/resources/svg/credit-cards.svg';
import QiwiSvg from 'src/resources/svg/qiwi.svg';

import {
    Container,
    StyledVerticalTabs
} from './styled';


function DepositRouter() {
    const methods = [
        {
            name: 'CREDIT_CARDS',
            title: 'Visa/MasterCard',
            svg: CreditCardsSvg,
            onClick: () => alert('credit'),
        },
        {
            name: 'QIWI',
            title: 'QIWI',
            svg: QiwiSvg,
            onClick: () => alert('qiwi'),
        },
    ];

    const activeTabName = useSelector((state) => state.cashier.activeTabName);

    return (
        <Container>
            <StyledVerticalTabs
                title={'Платежные методы'}
                tabs={methods}
                activeTabName={activeTabName}
            />
        </Container>
    );
}

DepositRouter.propTypes = {

};

DepositRouter.defaultProps = {

};

export default DepositRouter;

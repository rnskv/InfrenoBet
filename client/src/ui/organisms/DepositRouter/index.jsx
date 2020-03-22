import PropTypes from 'prop-types';

import React from 'react';
import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { changeDepositTab } from 'src/redux/cashier/actions';
import methods from 'src/configs/deposit-methods';

import {
    Container,
    StyledVerticalTabs,
} from './styled';


function DepositRouter() {
    const actions = useActions({ changeDepositTab });
    const activeDepositTabName = useSelector((state) => state.cashier.activeDepositTabName);

    const onMethodClick = (method) => {
        actions.changeDepositTab({ name: method.name });
    };

    return (
        <Container>
            <StyledVerticalTabs
                title="Платежные методы"
                tabs={methods}
                activeTabName={activeDepositTabName}
                onTabClick={onMethodClick}
            />
        </Container>
    );
}

DepositRouter.propTypes = {

};

DepositRouter.defaultProps = {

};

export default DepositRouter;

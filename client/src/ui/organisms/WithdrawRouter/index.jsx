import PropTypes from 'prop-types';

import React from 'react';
import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { changeWithdrawTab } from 'src/redux/cashier/actions';
import methods from 'src/configs/withdraw-methods';
import {
    Container,
    StyledVerticalTabs,
} from './styled';


function WithdrawRouter() {
    const actions = useActions({ changeWithdrawTab });
    const activeWithdrawTabName = useSelector((state) => state.cashier.activeWithdrawTabName);

    const onMethodClick = (method) => {
        actions.changeWithdrawTab({ name: method.name });
    };

    return (
        <Container>
            <StyledVerticalTabs
                tabs={methods}
                activeTabName={activeWithdrawTabName}
                onTabClick={onMethodClick}
            />
        </Container>
    );
}

WithdrawRouter.propTypes = {

};

WithdrawRouter.defaultProps = {

};

export default WithdrawRouter;

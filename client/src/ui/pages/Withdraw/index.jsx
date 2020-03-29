import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Section from 'ui/atoms/Section';
import WithdrawSelector from 'ui/organisms/WithdrawSelector';
import WithdrawRouter from 'ui/organisms/WithdrawRouter';
import WithdrawHistory from 'ui/organisms/WithdrawHistory';

function Deposit() {
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/withdraw"
                title="Вывод"
            />
            <Section>
                <WithdrawRouter />
                <WithdrawSelector />
            </Section>
            <WithdrawHistory />
        </DefaultTemplate>
    );
}

Deposit.propTypes = {
};

Deposit.defaultProps = {
};

export default Deposit;

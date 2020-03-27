import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';

import DepositRouter from 'ui/organisms/DepositRouter';
import DepositSelector from 'ui/organisms/DepositSelector';
import DepositHistory from 'ui/organisms/DepositHistory';

import Section from 'ui/atoms/Section';

function Deposit() {
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/deposit"
                title="Пополнение"
            />
            <Section>
                <DepositRouter />
                <DepositSelector />
            </Section>
            <DepositHistory />
        </DefaultTemplate>
    );
}

Deposit.propTypes = {
};

Deposit.defaultProps = {
};

export default Deposit;

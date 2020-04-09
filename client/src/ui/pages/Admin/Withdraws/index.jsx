import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Section from 'ui/atoms/Section';
import WithdrawHistory from 'ui/organisms/WithdrawHistory';
import WithdrawModeration from 'ui/organisms/WithdrawModeration';

function Withdraws() {
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/admin/withdraws"
                title="Модерация выводов"
            />

            <Section>
                <WithdrawModeration />
            </Section>
        </DefaultTemplate>
    );
}

Withdraws.propTypes = {
};

Withdraws.defaultProps = {
};

export default Withdraws;

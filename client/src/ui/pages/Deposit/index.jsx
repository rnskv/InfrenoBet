import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';

function Deposit() {
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/deposit"
                title="Пополнение"
            />
            <div style={{ padding: 100, fontSize: 25, textAlign: 'center' }}>
                Раздел в разработке
            </div>
        </DefaultTemplate>
    );
}

Deposit.propTypes = {
};

Deposit.defaultProps = {
};

export default Deposit;

import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Section from 'ui/atoms/Section';
import WithdrawSelector from 'ui/organisms/WithdrawSelector';
import WithdrawRouter from 'ui/organisms/WithdrawRouter';

import Table from 'ui/atoms/Table';
// import TableRow from 'ui/atoms/TableRow';

function Deposit() {
    const tableHeads = [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Имя' },
        { key: 'money', name: 'Деньги' },
        { key: 'city', name: 'Город' },
        { key: 'age', name: 'Возраст' },
    ];

    const tableRows = [{
        id: 1,
        name: 'Roma',
        money: 100,
        age: 25,
        city: 'Penza',
    }, {
        // id: 2,
        name: 'Kirill',
        money: 0,
        // city: 'Moscow',
    }, {
        id: 3,
        name: 'Kekich',
        money: 100,
        age: 0,
        city: 'Saratov',
    }];

    const getRowItemColor = (row, key) => {
        if (key !== 'age') return 'white';

        switch (row.age) {
        case 25: {
            return 'red';
        }

        case 0: {
            return 'green';
        }

        default: {
            return 'white';
        }
        }
    };

    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/withdraw"
                title="Вывод"
            />
            <Table heads={tableHeads} rows={tableRows} getRowItemColor={getRowItemColor}>
                {/* <tr> */}
                {/*    <td>Конец таблицы</td> */}
                {/* </tr> */}
            </Table>
            <Section>
                <WithdrawRouter />
                <WithdrawSelector />
            </Section>
        </DefaultTemplate>
    );
}

Deposit.propTypes = {
};

Deposit.defaultProps = {
};

export default Deposit;

import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { infernoClient } from 'src/index';

import Table from 'ui/atoms/Table';

import { getFormattedDate, getExchangedSum } from 'src/helpers/system';
import {
    Container,
} from './styled';


function DepositHistory() {
    const [history, setHistory] = useState(null);
    useEffect(() => {
        const { payment } = infernoClient.modules.api.services;
        async function fetchData() {
            const response = await payment.execute('getAllFreekassaPayments');
            setHistory(response);
        }

        fetchData();
    }, []);

    const heads = [
        { key: 'MERCHANT_ORDER_ID', name: 'Пользователь' },
        { key: 'intid', name: 'ID' },
        { key: 'AMOUNT', name: 'СУММА' },
        { key: 'createDate', name: 'ДАТА' },
        { key: 'STATUS', name: 'СТАТУС' },
    ];

    const getRowItemColor = (row, key) => {
        if (key !== 'STATUS') return 'white';

        switch (row.STATUS) {
        case 'SUCCESS': {
            return 'var(--color-green)';
        }

        default: {
            return 'white';
        }
        }
    };

    const getRowItemValue = (row, key) => {
        if (key === 'createDate') {
            return getFormattedDate(row[key]);
        }
        if (key === 'AMOUNT') {
            return getExchangedSum(row[key]);
        }
        if (key === 'MERCHANT_ORDER_ID') {
            return <div>
                { row[key].name }
                <img src={row[key].avatar} width={20}/>
            </div>;
        }
        return row[key];
    };

    return (
        <Container>
            {
                history ? (
                    <Table
                        getRowItemColor={getRowItemColor}
                        getRowItemValue={getRowItemValue}
                        heads={heads}
                        rows={history}
                    />
                ) : '....loading....'
            }

        </Container>
    );
}

DepositHistory.propTypes = {

};

DepositHistory.defaultProps = {

};

export default DepositHistory;

import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { infernoClient } from 'src/index';

import Table from 'ui/atoms/Table';

import { useAuth } from 'src/helpers/hooks';
import { getTimeFromNow, getExchangedSum } from 'src/helpers/system';
import {
    Container,
    StyledLoader,
} from './styled';


function DepositHistory() {
    const isAuth = useAuth();

    const [history, setHistory] = useState(null);
    useEffect(() => {
        const { payment } = infernoClient.modules.api.services;
        async function fetchData() {
            const response = await payment.execute('getMyDeposits');
            console.log('REPOS', response);
            setHistory(response);
        }

        fetchData();
    }, []);

    const heads = [
        { key: 'user', name: 'Пользователь' },
        { key: '_id', name: 'Идентификатор' },
        { key: 'system', name: 'Платежная система' },
        { key: 'amount', name: 'Сумма' },
        { key: 'createDate', name: 'Время' },
        { key: 'status', name: 'Статус' },
    ];

    const getRowItemColor = (row, key) => {
        if (key === 'amount') return 'var(--color-green)';
        if (key !== 'status') return 'white';

        switch (row.status) {
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
            return getTimeFromNow(row[key]);
        }
        if (key === 'amount') {
            return `+${getExchangedSum(row[key])}`;
        }
        if (key === 'user') {
            return (
                <div>
                    { row[key].name }
                    <img src={row[key].avatar} width={20} />
                </div>
            );
        }
        return row[key];
    };

    if (!isAuth) return <></>;

    return (
        <Container>
            {
                history ? (
                    <Table
                        getRowItemColor={getRowItemColor}
                        getRowItemValue={getRowItemValue}
                        heads={heads}
                        rows={history}
                        emptyText="Здесь будет выводится история ваших пополнений"
                    />
                ) : <StyledLoader />
            }

        </Container>
    );
}

DepositHistory.propTypes = {

};

DepositHistory.defaultProps = {

};

export default DepositHistory;

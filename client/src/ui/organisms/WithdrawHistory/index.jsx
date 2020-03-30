import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { infernoClient } from 'src/index';

import Table from 'ui/atoms/Table';

import { getTimeFromNow, getExchangedSum } from 'src/helpers/system';
import { useAuth } from 'src/helpers/hooks';

import withdrawTypes from 'shared/configs/withdrawTypes';

import {
    Container,
    StyledLoader,
} from './styled';


function WithdrawHistory() {
    const isAuth = useAuth();

    const [history, setHistory] = useState(null);
    const isLoading = useSelector((state) => state.cashier.isLoading);

    useEffect(() => {
        const { withdraw } = infernoClient.modules.api.services;
        async function fetchData() {
            const response = await withdraw.execute('getMy');
            setHistory(response);
        }

        fetchData();
    }, [isLoading]);

    const heads = [
        { key: '_id', name: 'Идентификатор' },
        { key: 'system', name: 'Платежная система' },
        { key: 'destination', name: 'Номер телефона' },
        { key: 'amount', name: 'Сумма' },
        { key: 'createDate', name: 'Время' },
        { key: 'status', name: 'Статус' },
    ];

    const getRowItemColor = (row, key) => {
        if (key === 'amount') return 'var(--color-red)';
        if (key !== 'status') return 'white';

        switch (row.status) {
        case 'SUCCESS': {
            return 'var(--color-green)';
        }
        case 'CREATED': {
            return 'var(--color-yellow)';
        }
        case 'ERROR': {
            return 'var(--color-red)';
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
            return `-${getExchangedSum(row[key])}`;
        }
        if (key === 'user') {
            return (
                <div>
                    { row[key].name }
                    <img src={row[key].avatar} width={20} />
                </div>
            );
        }

        if (key === 'status') {
            return withdrawTypes[row[key]].text;
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
                        emptyText="Здесь будет выводится история ваших выводов"
                    />
                ) : <StyledLoader />
            }

        </Container>
    );
}

WithdrawHistory.propTypes = {

};

WithdrawHistory.defaultProps = {

};

export default WithdrawHistory;

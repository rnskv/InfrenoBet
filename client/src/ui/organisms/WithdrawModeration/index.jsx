import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { infernoClient } from 'src/index';
import Button from 'ui/atoms/Button';
import Table from 'ui/atoms/Table';
import Actions from 'ui/organisms/WithdrawModeration/Actions';
import { getTimeFromNow, getExchangedSum } from 'src/helpers/system';
import { useAuth } from 'src/helpers/hooks';

import withdrawTypes from 'shared/configs/withdrawTypes';

import { useNotificationActions } from 'src/redux/user/hooks/actions';
import {
    Container,
    StyledLoader,
} from './styled';

function WithdrawModeration() {
    const { withdraw } = infernoClient.modules.api.services;
    const isAuth = useAuth();

    const [history, setHistory] = useState(null);
    const isLoading = useSelector((state) => state.cashier.isLoading);
    const notificationsActions = useNotificationActions();

    useEffect(() => {
        withdraw.execute('getAll').then((response) => {
            setHistory(response);
        })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {

            });
    }, [isLoading]);

    const heads = [
        { key: '_id', name: 'Идентификатор' },
        { key: 'user', name: 'Пользователь' },
        { key: 'system', name: 'Платежная система' },
        { key: 'destination', name: 'Номер телефона' },
        { key: 'amount', name: 'Сумма' },
        { key: 'createDate', name: 'Время' },
        { key: 'status', name: 'Статус' },
        { key: 'actions', name: 'Действия' },
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

    const removeRowById = (id) => {
        setHistory(history.filter(_h => _h._id !== id))
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

        if (key === 'actions') {
            return <Actions {...row} removeRowById={removeRowById}/>;
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

WithdrawModeration.propTypes = {

};

WithdrawModeration.defaultProps = {

};

export default WithdrawModeration;

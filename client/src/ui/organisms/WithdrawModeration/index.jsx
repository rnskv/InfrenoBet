import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { infernoClient } from 'src/index';
import Button from 'ui/atoms/Button';
import Actions from 'ui/organisms/WithdrawModeration/Actions';
import { getTimeFromNow, getExchangedSum } from 'src/helpers/system';
import { useAuth, useApi } from 'src/helpers/hooks';

import withdrawTypes from 'shared/configs/withdrawTypes';

import { useNotificationActions } from 'src/redux/user/hooks/actions';
import If from 'ui/atoms/If';
import Table from 'ui/organisms/ExpandedTable/Table';
import Row from 'ui/organisms/ExpandedTable/Row';
import Cell from 'ui/organisms/ExpandedTable/Cell';

import ExpandedTable from 'ui/organisms/ExpandedTable';
import Pagination from 'ui/organisms/Pagination';
import Loader from 'ui/atoms/Loader';
import Avatar from 'ui/atoms/Avatar';
import { USER_PAYMENT_ERROR, USER_PAYMENT_SUCCESS } from 'shared/configs/notificationsTypes';
import Title from 'ui/atoms/Title';
import {
    Container,
    LastWithdrawInformation,
    LastWithdraw,
} from './styled';

function renderRows(data, updateLastWithdraw) {
    return data.map((withdrawData) => (
        <Row>
            <Cell>{ withdrawData._id }</Cell>
            <Cell>
                <Avatar src={withdrawData.user.avatar} />
            </Cell>
            <Cell>{ withdrawData.destination }</Cell>
            <Cell>{ getExchangedSum(withdrawData.amount) }</Cell>
            <Cell>{ withdrawData.system }</Cell>
            <Cell>{ withdrawData.status }</Cell>
            <Cell>
                <Actions
                    _id={withdrawData._id}
                    destination={withdrawData.destination}
                    user={withdrawData.user}
                    amount={withdrawData.amount}
                    updateLastWithdraw={updateLastWithdraw}
                />
            </Cell>
        </Row>
    ));
}

function WithdrawModeration() {
    const [lastWithdraw, setLastWithdraw] = useState(null);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [counter, setCounter] = useState(0);

    const { response, err, isLoading } = useApi({
        serviceName: 'withdraw',
        methodName: 'getAll',
        params: {
            limit,
            offset,
        },
        counter,
    });

    const updateLastWithdraw = ({
        _id,
        user,
        amount,
        destination,
    }) => {
        setLastWithdraw({
            _id,
            user,
            amount,
            destination,
        });
        setCounter(counter + 1);
    };

    const showNextPage = () => {
        setOffset(offset + limit);
    };

    const showPrevPage = () => {
        setOffset(offset - limit);
    };

    if (!response) return <></>;

    return (
        <Container>
            <Title>Последний вывод:</Title>
            {lastWithdraw ? (
                <LastWithdraw>
                    <Avatar src={lastWithdraw.user.avatar} />
                    <LastWithdrawInformation>
                        {`${lastWithdraw.user.name} - ${getExchangedSum(lastWithdraw.amount)} на кошелек ${lastWithdraw.destination}`}
                    </LastWithdrawInformation>
                </LastWithdraw>
            ) : <span>Вы еще не соврешали выводов в этой сессии</span>}

            <Table>
                {
                    renderRows(response.data, updateLastWithdraw)
                }
            </Table>

            {
                <Pagination
                    isFirstPage={offset === 0}
                    isLastPage={response.extra.totalCount - offset <= limit}
                    onNextClick={showNextPage}
                    onPrevClick={showPrevPage}
                    isLoading={isLoading}
                    buttonsType="transparent"
                />
            }
        </Container>
    );
}

WithdrawModeration.propTypes = {

};

WithdrawModeration.defaultProps = {

};

export default WithdrawModeration;

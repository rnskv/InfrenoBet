import PropTypes from 'prop-types';
import React, { useState } from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import StatisticsItem from 'ui/organisms/StatisticsItem';
import { Wrapper, Filters } from 'ui/pages/Admin/Statistics/styled';
import Button from 'ui/atoms/Button';
import { useServices } from 'src/helpers/hooks';
import DatePicker from 'ui/atoms/DatePicker';

function Statistics() {
    const [dates, setDates] = useState([new Date(), new Date()]);
    const [data, setData] = useState({});

    const services = useServices();

    const loadStatistics = ({
        startDate, endDate,
    }) => async () => {
        const { statistics } = services;

        const response = await statistics.execute('getAll', {
            params: {
                startDate,
                endDate,
            },
        });

        setData(response);
    };

    const items = [
        {
            title: 'NGR',
            value: data.NGR,
        },
        {
            title: 'Revshare',
            value: data.totalRevShare,
        },
        {
            title: 'Comission',
            value: data.totalComission,
        },
        {
            title: 'Deposits',
            value: data.totalDeposits,
        },
        {
            title: 'Withdraws',
            value: data.totalWithdraws,
        },
    ];

    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/admin/statistics"
                title="Статистика сайта"
            />
            <Wrapper>
                <StatisticsItem items={items} />
                <Filters>
                    <DatePicker
                        onChange={setDates}
                        value={dates}
                    />
                    <Button onClick={loadStatistics({ startDate: dates[0], endDate: dates[1] })}>
                        Загрузить
                    </Button>
                </Filters>
            </Wrapper>
        </DefaultTemplate>
    );
}

Statistics.propTypes = {
};

Statistics.defaultProps = {
};

export default Statistics;

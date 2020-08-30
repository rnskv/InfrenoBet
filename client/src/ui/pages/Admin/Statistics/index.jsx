import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import StatisticsItem from 'ui/organisms/StatisticsItem';
import { Wrapper, Filters } from 'ui/pages/Admin/Statistics/styled';
import Button from 'ui/atoms/Button';
import { useServices } from 'src/helpers/hooks';
import DatePicker from 'ui/atoms/DatePicker';
import ItemsCollector from 'ui/organisms/ItemsCollector';
import useCurrentGame from './hooks/useCurrentGame';

function Statistics() {
    const { data: currentGame, pending, error } = useCurrentGame();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const [dates, setDates] = useState([today,tomorrow]);
    const [data, setData] = useState({});

    const services = useServices();

    const loadStatistics = async () => {
        const { statistics } = services;

        const response = await statistics.execute('getAll', {
            params: {
                startDate: dates[0],
                endDate: dates[1],
            },
        });

        setData(response);
    };

    useEffect(() => {
        loadStatistics();
    }, []);


    const mainItems = [
        {
            title: 'NGR',
            value: data.NGR,
        },
        {
            title: 'RevShare',
            value: data.totalRevShare,
        },
        {
            title: 'Comission',
            value: data.totalComission,
        },
    ];

    const moneyItems = [
        {
            title: 'Deposits',
            value: data.totalDeposits,
        },
        {
            title: 'Withdraws',
            value: data.totalWithdraws,
        },
        {
            title: 'Awards',
            value: data.totalAwards,
        },
    ];

    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/admin/statistics"
                title="Статистика сайта"
            />
            <div>
                { currentGame && <ul>
                    <li>ID игры: { currentGame._id }</li>
                    <li>Число раунда: { currentGame.secret }</li>
                </ul> }
            </div>
            <Wrapper>
                <Filters>
                    <DatePicker
                        onChange={setDates}
                        value={dates}
                    />
                    <Button onClick={loadStatistics}>
                        Загрузить
                    </Button>
                </Filters>
                <StatisticsItem title="MAIN" items={mainItems} />
                <StatisticsItem title="MONEY" items={moneyItems} />
                <ItemsCollector />
            </Wrapper>
        </DefaultTemplate>
    );
}

Statistics.propTypes = {
};

Statistics.defaultProps = {
};

export default Statistics;

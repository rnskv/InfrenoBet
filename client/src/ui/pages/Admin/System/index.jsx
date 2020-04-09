import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Button from 'ui/atoms/Button';
import { infernoClient } from 'src/index';

function Withdraws() {
    const [parsingInProccess, setParsingInProccess] = useState(false);
    const { items } = infernoClient.modules.api.services;

    const parseItems = async () => {
        setParsingInProccess(true);
        const response = await items.execute('parse');
        console.log('Спаршенные предметы', response);
        alert('Парсинг завершен, информация в консоли');
        setParsingInProccess(false);
    };

    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/admin/withdraws"
                title="Модерация выводов"
            />

            <Button isLoading={parsingInProccess} onClick={parseItems}>
                Запустить парсинг предметов
            </Button>

        </DefaultTemplate>
    );
}

Withdraws.propTypes = {
};

Withdraws.defaultProps = {
};

export default Withdraws;

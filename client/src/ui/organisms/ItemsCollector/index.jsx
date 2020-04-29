import PropTypes from 'prop-types';

import React, { useRef, useState } from 'react';
import { useServices } from 'src/helpers/hooks';

import {
    Container,
    BetItems,
    Button,
    Wrapper,
} from './styled';
import { Items } from 'ui/organisms/GameHistory/styled';
import Title from 'ui/atoms/Title';

function ItemsCollector({ className, style }) {
    const services = useServices();
    const [comission, setComission] = useState([]);

    const collect = async () => {
        const { items } = services;

        await items.execute('collectComission');
    };

    const getItems = async () => {
        const { items } = services;

        const response = await items.execute('getComission');

        setComission(response);
    };

    return (
        <Container className={className} style={style}>
            <Title>Предметы в комиссии:</Title>
            <Wrapper>
                <BetItems
                    items={comission}
                    useExtendedView
                />
                <Button onClick={getItems}>Обновить</Button>
                <Button onClick={collect}>Забрать комиссию</Button>
            </Wrapper>
        </Container>
    );
}

ItemsCollector.propTypes = {
};

ItemsCollector.defaultProps = {

};

export default ItemsCollector;

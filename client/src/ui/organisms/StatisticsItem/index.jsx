import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import { getExchangedSum } from 'src/helpers/system';
import {
    Container,
    Icon,
    Item,
    Value,
    Title,
} from './styled';

function StatisticsItem({ title, items }) {
    return (
        <Container>
            <Icon>
                { title }
            </Icon>

            {
                items.map((item) => (
                    <Item>
                        <Value>{ getExchangedSum(item.value) }</Value>
                        <Title>{ item.title }</Title>
                    </Item>
                ))
            }
        </Container>
    );
}

StatisticsItem.propTypes = {
};

StatisticsItem.defaultProps = {
};

export default StatisticsItem;

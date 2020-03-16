import PropTypes from 'prop-types';
import React from 'react';
import Button from 'ui/atoms/Button';
import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Currency,
    Value,
    Text,
} from './styled';

function Balance({
    value,
    currency,
    className,
    style,
}) {
    return (
        <Container className={className} style={style}>
            <Text>Ваш баланс:</Text>
            <Value>
                <span>{ getExchangedSum(value) }</span>
                <Currency>{ currency }</Currency>
            </Value>
        </Container>
    );
}

Balance.propTypes = {
    currency: PropTypes.string,
    value: PropTypes.number,
};

Balance.defaultProps = {
    currency: 'RUB',
    value: 0,
};

export default Balance;

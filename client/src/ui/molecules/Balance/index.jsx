import PropTypes from 'prop-types';
import React from 'react';
import Button from 'ui/atoms/Button';

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
                <span>{ `${value.toFixed(1)}₽` }</span>
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

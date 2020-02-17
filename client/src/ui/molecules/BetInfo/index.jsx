import PropTypes from 'prop-types';
import React from 'react';
import Button from 'ui/atoms/Button';

import {
    Container,
    BetSum,
} from './styled';

function _getTransactionSum(userValues) {
    return userValues.reduce((acc, value) => acc + value, 0);
}

function BetInfo({
    userValues, sendTransaction, className, style,
}) {
    return (
        <Container className={className} style={style}>
            <BetSum>
                Сумма:
                {' '}
                <span>
                    { _getTransactionSum(userValues) }
₽
                </span>
            </BetSum>
            <Button onClick={() => sendTransaction({ values: userValues })}>Сделать ставку</Button>
        </Container>
    );
}

BetInfo.propTypes = {
};

export default BetInfo;

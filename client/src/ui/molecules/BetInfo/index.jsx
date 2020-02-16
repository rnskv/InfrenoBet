import PropTypes from 'prop-types';
import React from 'react';
import Button from 'ui/atoms/Button';

import {
    Container,
    BetSum
} from './styled';

function BetInfo({ className, style }) {
    return (
        <Container className={className} style={style}>
            <BetSum>
                Сумма: <span>560₽</span>
            </BetSum>
            <Button>Сделать ставку</Button>
        </Container>
    );
}

BetInfo.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BetInfo;

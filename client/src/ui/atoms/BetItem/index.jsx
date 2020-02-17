import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Image,
} from './styled';

function BetItem({
    value, className, style, onClick,
}) {
    return (
        <Container className={className} style={style} value={value} onClick={onClick}>
            {
                value ? <img src={`https://d2lomvz2jrw9ac.cloudfront.net/common/currency/${value}.png`} /> : null
            }
        </Container>
    );
}

BetItem.propTypes = {
};

export default BetItem;

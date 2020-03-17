import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    Image,
} from './styled';

function BetItem({
    image, cost, className, style, onClick,
}) {
    return (
        <Container className={className} style={style} cost={cost} onClick={onClick}>
            {
                cost ? <img src={image} /> : null
            }
        </Container>
    );
}

BetItem.propTypes = {
    image: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BetItem;

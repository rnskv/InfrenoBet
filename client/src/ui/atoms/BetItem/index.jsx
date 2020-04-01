import PropTypes from 'prop-types';
import React from 'react';
import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Image,
} from './styled';

function BetItem({
    image, cost, className, style, onClick, isExtendedView, isInactivity, isActive,
}) {
    console.log(isInactivity)
    return (
        <Container
            className={className}
            style={style}
            cost={cost}
            onClick={onClick}
            isActive={isActive}
        >
            { isInactivity ? 'X' : ''}
            <img src={image} hidden={!cost} />
            <span hidden={!isExtendedView}>{ getExchangedSum(cost, { accuracy: 2 }) }</span>
        </Container>
    );
}

BetItem.propTypes = {
    image: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isExtendedView: PropTypes.bool,
    isActive: PropTypes.bool,
    isInactivity: PropTypes.bool,
};

BetItem.defaultProps = {
    isExtendedView: false,
    isActive: false,
    isInactivity: false,
};

export default BetItem;

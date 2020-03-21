import PropTypes from 'prop-types';
import React from 'react';
import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Image,
} from './styled';

function BetItem({
    image, cost, className, style, onClick, isExtendedView, isActive,
}) {
    return (
        <Container
            className={className}
            style={style}
            cost={cost}
            onClick={onClick}
            isActive={isActive}
        >
            <img src={image} hidden={!cost} />
            <span hidden={!isExtendedView}>{ getExchangedSum(cost, { accuracy: 1 }) }</span>
        </Container>
    );
}

BetItem.propTypes = {
    image: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isExtendedView: PropTypes.bool,
    isActive: PropTypes.bool,
};

BetItem.defaultProps = {
    isExtendedView: false,
    isActive: false,
};

export default BetItem;

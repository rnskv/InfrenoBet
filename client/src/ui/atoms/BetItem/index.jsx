import PropTypes from 'prop-types';
import React from 'react';
import { getExchangedSum } from 'src/helpers/system';

import {
    Container,
    Image,
    Selection,
} from './styled';

function BetItem({
    image, cost, className, style, onClick, isExtendedView, isInactivity, isActive, isSelected
}) {
    console.log('IS SELECTED', isSelected)
    return (
        <Container
            className={className}
            style={style}
            cost={cost}
            onClick={onClick}
            isActive={isActive}
            isInactivity={isInactivity}
        >
            <Selection hidden={!isSelected}/>
            <img src={image} hidden={!cost} />
            <span hidden={!isExtendedView}>{ getExchangedSum(cost, { accuracy: 2 }) }</span>
        </Container>
    );
}

BetItem.propTypes = {
    image: PropTypes.string,
    cost: PropTypes.number,
    onClick: PropTypes.func,
    isExtendedView: PropTypes.bool,
    isActive: PropTypes.bool,
    isInactivity: PropTypes.bool,
    isSelected: PropTypes.bool,
};

BetItem.defaultProps = {
    isExtendedView: false,
    isActive: false,
    isInactivity: false,
    isSelected: false,
    image: '',
    cost: 0,
    onClick: null
};

export default BetItem;

import PropTypes from 'prop-types';
import React from 'react';
import { getExchangedSum } from 'src/helpers/system';
import Svg from 'svg-inline-react';
import blockSvg from 'src/resources/svg/block.svg';

import {
    Container,
    Image,
    Selection,
} from './styled';

function BetItem({
    image, cost, className, style, onClick, isExtendedView, isInactivity, isActive, isBlocked, isSelected, size,
}) {

    return (
        <Container
            className={className}
            style={style}
            cost={cost}
            onClick={onClick}
            isActive={isActive}
            isInactivity={isInactivity || isBlocked}
            isBlocked={isBlocked}
            size={size}
        >
            <Svg src={blockSvg} hidden={!isBlocked} />
            <Selection hidden={!isSelected} />
            <img src={image} hidden={!cost} />

            <span hidden={!isExtendedView || isBlocked}>
                { getExchangedSum(cost, { accuracy: 2 }) }
            </span>
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
    isBlocked: PropTypes.bool,
    size: PropTypes.string,
};

BetItem.defaultProps = {
    isExtendedView: false,
    isActive: false,
    isInactivity: false,
    isSelected: false,
    image: '',
    cost: 0,
    onClick: null,
    isBlocked: false,
    size: 'normal',
};

export default BetItem;

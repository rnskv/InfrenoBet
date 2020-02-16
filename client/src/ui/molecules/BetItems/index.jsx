import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    StyledBetItem,
} from './styled';

function BetItems({
    onItemClick = () => {}, values, style, className,
}) {
    return (
        <Container style={style} className={className}>
            {
                values.map((value, index) => <StyledBetItem onClick={() => onItemClick({ value, index })} value={value} />)
            }
        </Container>
    );
}

BetItems.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BetItems;

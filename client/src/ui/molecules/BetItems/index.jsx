import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    StyledBetItem
} from './styled';

function BetItems({ values, style, className }) {
    return (
        <Container style={style} className={className}>
            {
                values.map(value => <StyledBetItem value={value} />)
            }
        </Container>
    );
}

BetItems.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BetItems;

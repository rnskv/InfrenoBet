import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    StyledBetItem,
} from './styled';

function BetItems({
    onItemClick, values, style, className,
}) {
    return (
        <Container style={style} className={className}>
            {
                values.map((value, index) => {
                    function onClick() {
                        if (onItemClick) {
                            onItemClick({ value, index });
                        }
                    }

                    return (
                        <StyledBetItem
                            key={`${value}-${index}`}
                            onClick={onClick}
                            value={value}
                        />
                    );
                })
            }
        </Container>
    );
}

BetItems.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BetItems;

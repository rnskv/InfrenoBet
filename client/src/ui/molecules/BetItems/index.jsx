import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
    StyledBetItem,
} from './styled';

function BetItems({
    onItemClick, items, style, className,
}) {
    return (
        <Container style={style} className={className}>
            {
                items.map((item, index) => {
                    function onClick() {
                        if (onItemClick) {
                            onItemClick({ item, index });
                        }
                    }

                    return (
                        <StyledBetItem
                            key={`${item._id}-${index}`}
                            onClick={onClick}
                            cost={item.cost || 0}
                            image={item.image || ''}
                        />
                    );
                })
            }
        </Container>
    );
}

BetItems.propTypes = {
};

export default BetItems;

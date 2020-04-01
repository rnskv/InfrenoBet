import PropTypes from 'prop-types';
import React from 'react';
import diff from 'deep-diff';

import {
    Container,
    StyledBetItem,
} from './styled';

function BetItems({
    onItemClick, items, selectedItems, useExtendedView, inactivityItems, style, className,
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
                            isExtendedView={useExtendedView}
                            cost={item.parent.cost}
                            image={item.parent.image}
                            isInactivity={!!inactivityItems.find((i) => i.assetId === item.assetId)}
                        />
                    );
                })
            }
            {
                items.length < 10 ? new Array(10 - items.length).fill(null).map((value, index) => <StyledBetItem
                    key={`${index}`}
                />) : null
            }
        </Container>
    );
}

BetItems.propTypes = {
    selectedItems: PropTypes.array,
    useExtendedView: PropTypes.bool,
    inactivityItems: PropTypes.array,
};

BetItems.defaultProps = {
    selectedItems: [],
    useExtendedView: false,
    inactivityItems: [],
};

export default BetItems;

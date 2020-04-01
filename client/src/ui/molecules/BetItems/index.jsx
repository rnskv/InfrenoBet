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

    const getFreeItems = () => {
        const freeItems = [...items];

        for (let item of inactivityItems) {
            if (!item) continue;
            let id = freeItems.findIndex((i => i._id === item._id));
            freeItems.splice(id, 1);
        }

        return freeItems;
    };


    return (
        <Container style={style} className={className}>
            {
                getFreeItems().map((item, index) => {
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
                            isExtendedView={useExtendedView}
                        />
                    );
                })
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
    inactivityItems: []
};

export default BetItems;

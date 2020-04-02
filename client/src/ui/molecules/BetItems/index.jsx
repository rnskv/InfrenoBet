import PropTypes from 'prop-types';
import React from 'react';
import diff from 'deep-diff';

import {
    Container,
    StyledBetItem,
} from './styled';

function BetItems({
    onItemClick, items, selectedItems, isNeedDrawEmptyCells, emptyCellsCount, useExtendedView, inactivityItems, style, className,
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

                    if (!item) return null;
                    return (
                        <StyledBetItem
                            key={`${item._id}`}
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
                isNeedDrawEmptyCells && items.length < emptyCellsCount
                    ? [...Array(emptyCellsCount - items.length).keys()].map((value, index) => (
                        <StyledBetItem
                            style={{animation: 'none'}}
                            key={`${value}`}
                        />
                    )) : null

            }
        </Container>
    );
}

BetItems.propTypes = {
    selectedItems: PropTypes.array,
    useExtendedView: PropTypes.bool,
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
    emptyCellsCount: PropTypes.number,
};

BetItems.defaultProps = {
    selectedItems: [],
    useExtendedView: false,
    inactivityItems: [],
    isNeedDrawEmptyCells: true,
    emptyCellsCount: 10,
};

export default BetItems;

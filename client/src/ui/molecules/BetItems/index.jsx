import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    Container,
    StyledBetItem,
    StyledLoader,
} from './styled';

function BetItems({
    onItemClick,
    items,
    selectedItems,
    checkInactivityItem,
    isNeedDrawEmptyCells,
    emptyCellsCount,
    useExtendedView,
    inactivityItems,
    style,
    className,
    isLoading,
}) {
    return (
        <Scrollbars autoHeight autoHeightMax="100%">
            <Container style={style} className={className}>
                <StyledLoader hidden={!isLoading} />
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
                                key={`${item._id}-${index}`}
                                onClick={onClick}
                                isExtendedView={useExtendedView}
                                cost={item.parent.cost}
                                image={item.parent.image}
                                isInactivity={
                                    !!inactivityItems.find((i) => i.assetId === item.assetId)
                                    || checkInactivityItem && checkInactivityItem(item)
                                }
                                isSelected={
                                    !!selectedItems.find((i) => i.assetId === item.assetId)
                                }
                            />
                        );
                    })
                }
                {
                    isNeedDrawEmptyCells && items.length < emptyCellsCount
                        ? [...Array(emptyCellsCount - items.length).keys()].map((value, index) => (
                            <StyledBetItem
                                style={{ animation: 'none' }}
                                key={`${value}`}
                            />
                        )) : null

                }
            </Container>
        </Scrollbars>
    );
}

BetItems.propTypes = {
    selectedItems: PropTypes.array,
    useExtendedView: PropTypes.bool,
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
    emptyCellsCount: PropTypes.number,
    checkInactivityItem: PropTypes.func,
    isLoading: PropTypes.bool,
};

BetItems.defaultProps = {
    selectedItems: [],
    useExtendedView: false,
    inactivityItems: [],
    isNeedDrawEmptyCells: true,
    emptyCellsCount: 10,
    checkInactivityItem: null,
    isLoading: false,
};

export default BetItems;

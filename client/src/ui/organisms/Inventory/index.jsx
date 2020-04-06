import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from 'ui/atoms/Loader';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import { useShallowEqualSelector } from 'src/helpers/hooks';
import BetItem from 'ui/atoms/BetItem';
import { RightBlock } from 'ui/organisms/BetMaker/styled';
import { usePopupsActions } from 'src/redux/user/hooks/actions';

import {
    Container,
    GameBlock,
    StyledBetItems,
} from './styled';

function Inventory({ useExtendedView, onItemClick, inactivityItems, isNeedDrawEmptyCells, emptyCellsCount, isNeedShowGamesBlock, viewport, className, style, size }) {
    const profile = useSelector((state) => state.user.profile);
    const popupsActions = usePopupsActions();
    const isDisabled = !profile.steamId || !profile.steamTradeUrl;

    if (profile.isLoading) {
        return <Loader />;
    }

    return (
        <Container className={className} style={style}>
            {/* <Button onClick={popupsActions.openSteamInventory}>Пополнить</Button> */}

            {
                isNeedShowGamesBlock && <GameBlock
                    disabled={isDisabled}
                    onClick={popupsActions.openSteamInventory}
                >
                    <div>
                        Пополнить
                        <b>DOTA 2</b>
                    </div>
                </GameBlock>
            }
            <StyledBetItems
                onItemClick={onItemClick}
                items={profile.inventory}
                inactivityItems={inactivityItems}
                useExtendedView={useExtendedView}
                isNeedDrawEmptyCells={isNeedDrawEmptyCells}
                hidden={isDisabled}
                emptyCellsCount={emptyCellsCount}
                viewport={viewport}
                size={size}
            />
        </Container>
    );
}

Inventory.propTypes = {
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
    isNeedShowGamesBlock: PropTypes.bool,
    emptyCellsCount: PropTypes.number,
    useExtendedView: PropTypes.bool,
};

Inventory.defaultProps = {
    isNeedDrawEmptyCells: true,
    isNeedShowGamesBlock: true,
    emptyCellsCount: 8,
    useExtendedView: true,
};

export default Inventory;

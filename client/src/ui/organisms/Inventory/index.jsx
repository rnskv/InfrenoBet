import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'ui/atoms/Loader';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import { useShallowEqualSelector } from 'src/helpers/hooks';
import BetItem from 'ui/atoms/BetItem';
import { RightBlock, StyledBetItems } from 'ui/organisms/BetMaker/styled';
import { usePopupsActions } from 'src/redux/user/hooks/actions';

import {
    Container,
    GameBlock,
} from './styled';

function Inventory({ onItemClick, inactivityItems, isNeedDrawEmptyCells }) {
    const profile = useSelector((state) => state.user.profile);
    const popupsActions = usePopupsActions();

    if (profile.isLoading) {
        return <Loader />;
    }

    return (
        <Container>
            {/* <Button onClick={popupsActions.openSteamInventory}>Пополнить</Button> */}

            <GameBlock onClick={popupsActions.openSteamInventory}>
                <div>
                    Пополнить
                    <b>DOTA 2</b>
                </div>
            </GameBlock>

            <StyledBetItems
                onItemClick={onItemClick}
                items={profile.inventory}
                inactivityItems={inactivityItems}
                useExtendedView
                isNeedDrawEmptyCells={isNeedDrawEmptyCells}
            />
        </Container>
    );
}

Inventory.propTypes = {
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
};

Inventory.defaultProps = {
    isNeedDrawEmptyCells: true,
};

export default Inventory;

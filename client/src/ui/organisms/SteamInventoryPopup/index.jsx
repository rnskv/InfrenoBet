import PropTypes from 'prop-types';

import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'ui/atoms/Loader';
import Button from 'ui/atoms/Button';
import Popup from 'ui/molecules/Popup';
import { infernoClient } from 'src/index';
import { usePopupsActions } from 'src/redux/user/hooks/actions';
import { useSteamInventorySelector } from 'src/redux/user/hooks/selectors';
import { useBetMakerActions } from 'src/redux/betMaker/hooks/actions';

import SteamInventory from 'ui/organisms/SteamInventory';
import {
    Container,
    Description,
    StyledBetItems,
    StyledTitle,
    EmptyMessage,
    ItemsContainer,
} from './styled';

function SteamInventoryPopup({ inactivityItems, isNeedDrawEmptyCells }) {
    const { isVisible } = useSteamInventorySelector();
    const popupsActions = usePopupsActions();

    return (
        <Popup isVisible={isVisible} close={popupsActions.closeSteamInventory}>
            <StyledTitle>Выберите предметы из вашего STEAM инвентаря</StyledTitle>
            <SteamInventory inactivityItems={inactivityItems} isNeedDrawEmptyCell={isNeedDrawEmptyCells} />
        </Popup>
    );
}

SteamInventoryPopup.propTypes = {
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
};

SteamInventoryPopup.defaultProps = {
    isNeedDrawEmptyCells: true,
};

export default SteamInventoryPopup;

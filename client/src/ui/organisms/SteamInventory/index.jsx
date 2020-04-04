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

import {
    Container,
    Description,
    StyledBetItems,
    StyledTitle,
    EmptyMessage,
    ItemsContainer,
} from './styled';

function SteamInventory({ inactivityItems, isNeedDrawEmptyCells }) {
    const { isVisible } = useSteamInventorySelector();
    const [isLoading, setIsLoading] = useState(false);
    const [inventoryIsLoading, setInventoryIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const profile = useSelector((state) => state.user.profile);
    const popupsActions = usePopupsActions();
    const betMakerActions = useBetMakerActions();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (!isVisible) return;
        setInventoryIsLoading(true);
        infernoClient.modules.api.services.user.execute('getInventory').then((items) => {
            setItems(items);
        }).finally(() => {
            setInventoryIsLoading(false);
        });
    }, [isVisible]);

    useEffect(() => {
        setSelectedItems([]);
    }, [isVisible]);

    const onItemClick = ({ item, index }) => {
        const isSelected = selectedItems.findIndex((i) => i.assetId === item.assetId) !== -1;

        const newSelectedItems = isSelected
            ? selectedItems.filter((i) => i.assetId !== item.assetId)
            : [...selectedItems, item];

        setSelectedItems(newSelectedItems);
    };

    const requestWithdrawItem = () => {
        setIsLoading(true);
        infernoClient.modules.realtime.io.emit('user.steam.deposit.items', {
            items: selectedItems,
            profile,
        });

        setTimeout(() => {
            popupsActions.closeSteamInventory();
            setIsLoading(false);
            betMakerActions.close();
        }, 1000);
    };

    return (
        <Popup isVisible={isVisible} close={popupsActions.closeSteamInventory}>
            <StyledTitle>Выберите предметы из вашего STEAM инвентаря</StyledTitle>
            <Container>
                <EmptyMessage hidden={!!items.length}>
                    К сожалению, подходящие для игры предметы не обнаружены в вашем инвентаре
                </EmptyMessage>

                <ItemsContainer>
                    <StyledBetItems
                        onItemClick={onItemClick}
                        items={items}
                        useExtendedView
                        selectedItems={selectedItems}
                        isNeedDrawEmptyCells={isNeedDrawEmptyCells}
                        isLoading={inventoryIsLoading}
                    />
                </ItemsContainer>

                <Button
                    onClick={requestWithdrawItem}
                    disabled={!selectedItems.length}
                    isLoading={isLoading}
                >
                    Пополнить инвентарь
                </Button>
                <Description>
                    Наша система отправит вам предложение обмена с выбранными вещами.
                </Description>
                <Description>
                    <b>ВНИМАНИЕ!</b>
                    { ' Перед тем как принять предложения обмена, обязательно обратите внимание на проверочный код. Он должен совпадать с кодом из уведомления.' }
                </Description>
            </Container>
        </Popup>
    );
}

SteamInventory.propTypes = {
    inactivityItems: PropTypes.array,
    isNeedDrawEmptyCells: PropTypes.bool,
};

SteamInventory.defaultProps = {
    isNeedDrawEmptyCells: true,
};

export default SteamInventory;

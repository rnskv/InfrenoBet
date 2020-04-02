import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';
import DepositCoins from 'ui/organisms/DepositCoins';
import VerifyAge from 'ui/molecules/VerifyAge';
import WithdrawExchanger from 'ui/organisms/WithdrawExchanger';

import { getExchangedSum, getSumInUSD } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import Inventory from 'ui/organisms/Inventory';
import { infernoClient } from 'src/index';
import { USER_CREATE_STEAM_ITEMS_WITHDRAW } from 'shared/configs/notificationsTypes';
import { WithdrawInput } from 'ui/organisms/WithdrawExchanger/styled';
import BetItems from 'ui/molecules/BetItems';
import Title from 'ui/atoms/Title';

import { useNotificationActions, userProfileActions } from 'src/redux/user/hooks/actions';

import {
    Container,
    InputContainer,
    StyledButton,
    StyledTitle,
} from './styled';

const { changeValue } = infernoClient.modules.store.actions.cashier;
const { createQiwiWithdraw } = infernoClient.modules.store.domains.cashier;


function WithdrawSteamItems() {
    const notificationsActions = useNotificationActions();

    const [isLoading, setIsLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const getItemsIds = (items) => items.map((item) => item._id);
    const getItemsAmount = (items) => items.reduce((acc, item) => acc + item.parent.cost, 0);
    const addItemToCart = ({ item, index }) => {
        console.log(item, index);
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = ({ item }) => {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    };

    const requestWithdraw = () => {
        setIsLoading(true);
        infernoClient.modules.api.services.tradeOffers.execute('create', {
            body: {
                items: cartItems,
            },
        })
            .then(() => {
                notificationsActions.addNotification({ type: 'USER_CREATE_STEAM_ITEMS_WITHDRAW' });
                userProfileActions.getProfile();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <StyledTitle>Выберите вещи:</StyledTitle>

            <Inventory
                inactivityItems={cartItems}
                onItemClick={addItemToCart}
                isNeedDrawEmptyCells={false}
            />

            <StyledTitle>

                { `Вы получите: ${getExchangedSum(getItemsAmount(cartItems))}` }
            </StyledTitle>

            <BetItems
                items={cartItems}
                onItemClick={removeItemFromCart}
                emptyCellsCount={8}
            />

            <StyledButton
                isLoading={isLoading}
                onClick={requestWithdraw}
            >
                Вывести
            </StyledButton>
        </Container>
    );
}

WithdrawSteamItems.propTypes = {

};

WithdrawSteamItems.defaultProps = {

};

export default WithdrawSteamItems;

import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import Svg from 'svg-inline-react';

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
import BetItems from 'ui/molecules/BetItems';
import chooseSvg from 'src/resources/svg/choose.svg';

import { useNotificationActions, userProfileActions } from 'src/redux/user/hooks/actions';

import Popup from 'ui/molecules/Popup';
import {
    Container,
    InputContainer,
    InventoryContainer,
    StyledButton,
    StyledTitle,
    Cart,
    ItemsViewport,
    StyledInventory,
    StyledPopup,
    Wrapper
} from './styled';

const { changeValue } = infernoClient.modules.store.actions.cashier;
const { createQiwiWithdraw } = infernoClient.modules.store.domains.cashier;


function WithdrawSteamItems() {
    const notificationsActions = useNotificationActions();
    const profileActions = userProfileActions();

    const [isOpened, setIsOpened] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const getItemsIds = (items) => items.map((item) => item._id);
    const getItemsAmount = (items) => items.reduce((acc, item) => acc + item.parent.cost, 0);
    const addItemToCart = ({ item, index }) => {
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
        <div>
            <StyledTitle>Вывод предметов в STEAM</StyledTitle>
            <Container>
                <Wrapper>
                    <InventoryContainer>
                        <ItemsViewport>
                            <StyledInventory
                                inactivityItems={cartItems}
                                onItemClick={addItemToCart}
                                emptyCellsCount={12}
                                viewport={{ height: '220px' }}
                                isNeedShowGamesBlock={false}
                                size={'small'}
                            />
                        </ItemsViewport>
                    </InventoryContainer>
                    <Svg src={chooseSvg} />
                    <Cart>
                        <ItemsViewport>
                            <BetItems
                                items={cartItems}
                                onItemClick={removeItemFromCart}
                                emptyCellsCount={12}
                                viewport={{ height: '220px' }}
                                size={'small'}
                            />
                        </ItemsViewport>
                    </Cart>
                </Wrapper>
                <StyledButton
                    isLoading={isLoading}
                    onClick={requestWithdraw}
                >
                    {`Вывести предметы на сумму ${getExchangedSum(getItemsAmount(cartItems))}`}
                </StyledButton>
            </Container>
        </div>
    );
}

WithdrawSteamItems.propTypes = {

};

WithdrawSteamItems.defaultProps = {

};

export default WithdrawSteamItems;

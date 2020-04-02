import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';
import { changeValue } from 'src/redux/cashier/actions';

import { useActions } from 'src/helpers/hooks';
import {
    Container,
    InputContainer,
    StyledBetItem,
} from './styled';

const DEPOSIT_COINS = [
    {
        image: '/dist/resources/images/100_coin.png',
        cost: 1,
    },
    {
        image: '/dist/resources/images/250_coin.png',
        cost: 2.5,
    },
    {
        image: '/dist/resources/images/500_coin.png',
        cost: 5,
    },
    {
        image: '/dist/resources/images/1000_coin.png',
        cost: 10,
    },
    {
        image: '/dist/resources/images/2500_coin.png',
        cost: 25,
    },
    {
        image: '/dist/resources/images/5000_coin.png',
        cost: 50,
    },
    {
        image: '/dist/resources/images/10000_coin.png',
        cost: 100,
    },
    {
        image: '/dist/resources/images/50000_coin.png',
        cost: 500,
    },
];

function DepositCoins({ disabled }) {
    const value = useSelector((state) => state.cashier.value);
    const actions = useActions({ changeValue });

    return (
        <Container disabled={disabled}>
            { DEPOSIT_COINS.map((coin) => (
                <StyledBetItem
                    key={coin.cost}
                    image={coin.image}
                    cost={coin.cost}
                    isExtendedView
                    isActive={
                        Number(value) === getExchangedSum(coin.cost, {
                            isNeedIcon: false,
                            accuracy: 1,
                        })
                    }
                    onClick={
                        () => actions.changeValue({
                            value: getExchangedSum(coin.cost, {
                                isNeedIcon: false,
                                accuracy: 1,
                            }),
                        })
                    }
                />
            ))}
        </Container>
    );
}

DepositCoins.propTypes = {
    disabled: PropTypes.bool,
};

DepositCoins.defaultProps = {
    disabled: false,
};

export default DepositCoins;

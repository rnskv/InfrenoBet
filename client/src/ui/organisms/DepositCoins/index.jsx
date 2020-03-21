import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

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

function DepositCoins() {
    return (
        <Container>
            { DEPOSIT_COINS.map((coin) => (
                <StyledBetItem
                    image={coin.image}
                    onClick={() => alert('Пополним на ' + coin.cost)}
                    cost={coin.cost}
                />
            ))}
        </Container>
    );
}

DepositCoins.propTypes = {

};

DepositCoins.defaultProps = {

};

export default DepositCoins;

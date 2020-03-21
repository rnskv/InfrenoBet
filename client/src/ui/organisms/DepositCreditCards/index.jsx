import PropTypes from 'prop-types';

import React from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';
import DepositCoins from 'ui/organisms/DepositCoins';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import {
    Container,
    InputContainer,
    StyledButton
} from './styled';


function DepositCreditCards() {
    return (
        <Container>
            <NotAuthPlaceHolder isVisible={false}/>
            <InputContainer>
                <Input
                    label={'Сумма пополнения (RUB)'}
                    placeholder={'Введите сумму...'}
                />
                <StyledButton>Пополнить</StyledButton>
            </InputContainer>
            <DepositCoins />
        </Container>
    );
}

DepositCreditCards.propTypes = {

};

DepositCreditCards.defaultProps = {

};

export default DepositCreditCards;

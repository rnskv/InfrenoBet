import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';
import DepositCoins from 'ui/organisms/DepositCoins';
import VerifyAge from 'ui/molecules/VerifyAge';
import WithdrawExchanger from 'ui/organisms/WithdrawExchanger';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { changeValue } from 'src/redux/cashier/actions';

import {
    Container,
    InputContainer,
    StyledButton,
} from './styled';
import { WithdrawInput } from 'ui/organisms/WithdrawExchanger/styled';


function WithdrawQiwi() {
    const actions = useActions({ changeValue });
    const value = useSelector((state) => state.cashier.value);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = '';
    });

    const submitWithdraw = ({ amount }) => {
        console.log(`Выводим на киви кошелек ${inputRef.current.value} сумму ${amount}`)
    };

    return (
        <Container>
            <InputContainer>
                <Input
                    label="Номер QIWI кошелька"
                    description={`Введите свой QIWI кошелёк без знака +`}
                    ref={inputRef}
                />

                <WithdrawExchanger onSubmit={submitWithdraw} />
            </InputContainer>
        </Container>
    );
}

WithdrawQiwi.propTypes = {

};

WithdrawQiwi.defaultProps = {

};

export default WithdrawQiwi;

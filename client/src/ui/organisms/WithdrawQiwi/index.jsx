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

import { infernoClient } from 'src/index';

import { WithdrawInput } from 'ui/organisms/WithdrawExchanger/styled';
import {
    Container,
    InputContainer,
    StyledButton,
} from './styled';

const { changeValue } = infernoClient.modules.store.actions.cashier;
const { createQiwiWithdraw } = infernoClient.modules.store.domains.cashier;


function WithdrawQiwi() {
    const actions = useActions({ changeValue, createQiwiWithdraw });
    const value = useSelector((state) => state.cashier.value);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = '';
    });

    const submitWithdraw = ({ amount }) => {
        actions.createQiwiWithdraw({ amount: getSumInUSD(amount), phone: inputRef.current.value });
    };

    return (
        <Container>
            <InputContainer>
                <Input
                    type="tel"
                    maskType="tel"
                    required
                    name="phone"
                    label="Номер QIWI кошелька"
                    description="Введите номер своего QIWI кошелька"
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

import PropTypes from 'prop-types';

import React, { useState, useRef, useEffect } from 'react';
import SVG from 'svg-inline-react';

import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';
import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import DepositCreditCards from 'ui/organisms/DepositCreditCards';
import chooseSvg from 'src/resources/svg/choose.svg';
import WithdrawQiwi from 'ui/organisms/WithdrawQiwi';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import VerifyAge from 'ui/molecules/VerifyAge';
import Verify from 'ui/molecules/Verify';
import { withdraw } from 'shared/configs/settings';

import {
    Container,
    InputsContainer,
    WithdrawInput,
    WithdrawButton,
} from './styled';


function WithdrawExchanger({
    onSubmit,
}) {
    const isLoading = useSelector((state) => state.cashier.isLoading);
    const [isVerifiedAge, setIsVerifiedAge] = useState(false);
    const [realSum, setRealSum] = useState(0);
    const [sum, setSum] = useState(0);

    const sumInputRef = useRef(null);
    const sumRealInputRef = useRef(null);

    const onVerifiedChange = () => {
        setIsVerifiedAge(!isVerifiedAge);
    };

    const onClick = () => {
        onSubmit({ amount: sumInputRef.current.value });
    };

    const sumRealOnChange = () => {
        sumInputRef.current.value = (sumRealInputRef.current.value / (1 - withdraw.commission)).toFixed(0);
    };

    const sumOnChange = () => {
        sumRealInputRef.current.value = (sumInputRef.current.value * (1 - withdraw.commission)).toFixed(0);
    };

    return (
        <Container>
            <InputsContainer>
                <WithdrawInput
                    label="Вывести"
                    description={`Минимум ${getExchangedSum(withdraw.minimal)}`}
                    ref={sumInputRef}
                    onInput={sumOnChange}
                    type="number"
                />
                <WithdrawInput
                    label="Получить"
                    description={`С учетом комиссии ${withdraw.commission * 100}%`}
                    ref={sumRealInputRef}
                    type="number"
                    onInput={sumRealOnChange}
                />
            </InputsContainer>
            <Verify
                onChange={onVerifiedChange}
                isVerified={isVerifiedAge}
                text="Я подтверждаю правильность введенных реквизитов и согласен с суммой выплаты."
            />
            <WithdrawButton
                isLoading={isLoading}
                onClick={onClick}
                disabled={!isVerifiedAge}
            >
                Вывести
            </WithdrawButton>
        </Container>
    );
}

WithdrawExchanger.propTypes = {

};

WithdrawExchanger.defaultProps = {

};

export default WithdrawExchanger;

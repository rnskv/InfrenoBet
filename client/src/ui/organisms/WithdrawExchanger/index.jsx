import PropTypes from 'prop-types';

import React, { useState, useRef } from 'react';
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
import {
    Container,
    InputsContainer,
    WithdrawInput,
    WithdrawButton,
} from './styled';


function WithdrawExchanger({
    onSubmit
}) {
    const [isVerifiedAge, setIsVerifiedAge] = useState(false);
    const sumInputRef = useRef(null);
    const sumRealInputRef = useRef(null);

    const commission = 0.1;

    const onVerifiedChange = () => {
        setIsVerifiedAge(!isVerifiedAge);
    };

    const onClick = () => {
        onSubmit({ amount: sumInputRef.current.value })
    };

    const sumRealOnChange = () => {
      console.log('Меняется сумма с комиссией');
        sumInputRef.current.value = (sumRealInputRef.current.value / (1 - commission)).toFixed(2);
    };

    const sumOnChange = () => {
        console.log('Меняется сумма');
        sumRealInputRef.current.value = (sumInputRef.current.value * (1 - commission)).toFixed(2);
    };

    return (
        <Container>
            <InputsContainer>
                <WithdrawInput
                    label="Вывести"
                    description={`Минимум ${getExchangedSum(2)}`}
                    ref={sumInputRef}
                    onChange={sumOnChange}
                />
                <WithdrawInput
                    label="Получить"
                    description={`С учетом комиссии ${commission * 100}%`}
                    ref={sumRealInputRef}
                    onChange={sumRealOnChange}
                />
            </InputsContainer>
            <Verify
                onChange={onVerifiedChange}
                isVerified={isVerifiedAge}
                text="Я подтверждаю правильность введенных реквизитов и согласен с суммой выплаты."
            />
            <WithdrawButton onClick={onClick} disabled={!isVerifiedAge}>Вывести</WithdrawButton>
        </Container>
    );
}

WithdrawExchanger.propTypes = {

};

WithdrawExchanger.defaultProps = {

};

export default WithdrawExchanger;

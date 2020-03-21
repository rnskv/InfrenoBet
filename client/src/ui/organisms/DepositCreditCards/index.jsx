import PropTypes from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import NotAuthPlaceHolder from 'ui/organisms/NotAuthPlaceholder';

import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';
import BetItem from 'ui/atoms/BetItem';
import DepositCoins from 'ui/organisms/DepositCoins';
import VerifyAge from 'ui/molecules/VerifyAge';

import { getExchangedSum } from 'src/helpers/system';

import { useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { changeValue } from 'src/redux/cashier/actions';

import {
    Container,
    InputContainer,
    StyledButton,
} from './styled';


function DepositCreditCards() {
    const [isVerifiedAge, setIsVerifiedAge] = useState(false);
    const actions = useActions({ changeValue });
    const value = useSelector((state) => state.cashier.value);
    const inputRef = useRef(null);

    const onVerifiedChange = () => {
        setIsVerifiedAge(!isVerifiedAge);
    };

    const onChange = () => {
        actions.changeValue({ value: Number(inputRef.current.value) });
    };

    useEffect(() => {
        inputRef.current.value = value || '';
    });

    return (
        <Container>
            <NotAuthPlaceHolder isVisible={false} />
            <InputContainer>
                <Input
                    label="Сумма пополнения (RUB)"
                    placeholder="Введите сумму..."
                    // value={value}
                    ref={inputRef}
                    onChange={onChange}
                    type={'number'}
                />
                <StyledButton disabled={!isVerifiedAge}>Пополнить</StyledButton>
            </InputContainer>
            <DepositCoins disabled={!isVerifiedAge}/>
            <VerifyAge onChange={onVerifiedChange} isVerified={isVerifiedAge}/>
        </Container>
    );
}

DepositCreditCards.propTypes = {

};

DepositCreditCards.defaultProps = {

};

export default DepositCreditCards;

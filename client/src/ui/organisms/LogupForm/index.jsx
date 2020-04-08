import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import {
    Container,
    StyledForm,
    Label,
    Name,
    StyledButton,
} from './styled';

function LogupForm({ logUp, isLoading }) {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const nameInput = useRef(null);

    function onSubmit(e) {
        e.preventDefault();

        const name = nameInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        logUp({
            name,
            email,
            password,
        });
    }

    return (
        <Container>
            <StyledForm
                onSubmit={onSubmit}
                title="Присоединяйся!"
            >
                <Input
                    ref={nameInput}
                    type="name"
                    name="name"
                    label="Имя"
                />

                <Input
                    ref={emailInput}
                    type="email"
                    name="email"
                    label="E-mail"
                />

                <Input
                    ref={passwordInput}
                    type="password"
                    name="password"
                    label="Пароль"
                />

                <StyledButton isLoading={isLoading}>Зарегистрироваться</StyledButton>
            </StyledForm>
        </Container>
    );
}

LogupForm.propTypes = {
    logUp: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

LogupForm.defaultProps = {
    isLoading: false,
};

export default LogupForm;

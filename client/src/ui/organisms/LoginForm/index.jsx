import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import {
    Container,
    StyledForm,
    Label,
    Name,
} from './styled';

function LoginForm({ logIn, error }) {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    function onSubmit(e) {
        e.preventDefault();

        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        logIn({
            email,
            password,
        });
    }

    return (
        <Container>
            <StyledForm
                onSubmit={onSubmit}
                title="Sign In"
                error={error}
            >
                <Label>
                    <Name>Email:</Name>
                    <Input ref={emailInput} type="email" name="email" />
                </Label>

                <Label>
                    <Name>Password:</Name>
                    <Input ref={passwordInput} type="password" name="password" />
                </Label>
                <Button>SIGN IN</Button>
            </StyledForm>
        </Container>
    );
}

LoginForm.propTypes = {
    logIn: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default LoginForm;

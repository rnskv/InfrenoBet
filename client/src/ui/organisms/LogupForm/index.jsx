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

function LogupForm({ logUp, error }) {
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
                title="Sign Up"
                error={error}
            >
                <Label>
                    <Name>First Name:</Name>
                    <Input ref={nameInput} type="name" name="name" />
                </Label>

                <Label>
                    <Name>Email:</Name>
                    <Input ref={emailInput} type="email" name="email" />
                </Label>

                <Label>
                    <Name>Password:</Name>
                    <Input ref={passwordInput} type="password" name="password" />
                </Label>
                <Button>SIGN UP</Button>
            </StyledForm>
        </Container>
    );
}

LogupForm.propTypes = {
    logUp: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default LogupForm;

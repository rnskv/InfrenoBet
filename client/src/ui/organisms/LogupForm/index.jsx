import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledForm = styled(AuthenticationForm)`
    ${Input} {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    
    ${Button} {
        margin: 0 0;
    }
`;

const Label = styled.label`
`;

const Name = styled.span`
    color: var(--color-grey);
    margin: 10px 0;
    display: block;
`;

function LogupForm({ logUp }) {
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
            <StyledForm onSubmit={onSubmit} title="Sign Up">
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
};

export default LogupForm;

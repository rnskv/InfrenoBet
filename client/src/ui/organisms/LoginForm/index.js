import React from 'react';
import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Title from 'ui/atoms/Title';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    width: 400px;
    background: var(--color-darkblue);
    
    padding: 25px;
    margin: 25px;
    border-radius: 8px;
    
    ${Input} {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    
    ${Button} {
        margin: 0 0;
    }
    
    ${Title} {
        margin: 0 0 25px;
    }
`;

const Label = styled.label`
`;

const Name = styled.span`
    color: var(--color-grey);
    margin: 10px 0;
    display: block;
`;

function Login({ ...props }) {
    return (
        <Container>
            <Form>
                <Title>Sign in</Title>
                <Label>
                    <Name>Email:</Name>
                    <Input type="email" name="email" />
                </Label>

                <Label>
                    <Name>Password:</Name>
                    <Input type="password" name="password" />
                </Label>
                <Button>SIGN IN</Button>
            </Form>
        </Container>
    );
}

export default Login;

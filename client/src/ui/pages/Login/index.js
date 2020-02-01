import React from 'react';
import styled from 'styled-components'

import LoginForm from "ui/organisms/LoginForm";
import DefaultTemplate from "ui/templates/Default";


function Login({...props}) {
    return (
        <DefaultTemplate>
            <LoginForm/>
        </DefaultTemplate>
    )
}

export default Login;

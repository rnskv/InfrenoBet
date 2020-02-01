import React from 'react';
import styled from 'styled-components'

import Button from "ui/atoms/Button";


function Login({...props}) {
    return (
        <div>
            Авторизация
            <Button text={'Авторизироваться'}/>
        </div>
    )
}

export default Login;

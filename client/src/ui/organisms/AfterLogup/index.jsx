import PropTypes from 'prop-types';

import React from 'react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';

import {
    Container,
    Description,
} from './styled';

function AfterLogup({ reset }) {
    return (
        <Container>
            <Title>СПАСИБО ЗА РЕГИСТРАЦИЮ!</Title>
            <Description>
                ВЫ УСПЕШНО ЗАРЕГИСТРИРОВАНЫ! ТЕПЕРЬ ВЫ МОЖЕТЕ АВТОРИЗИРОВАТЬСЯ И ВСТУПИТЬВ ИГРУ!
            </Description>
            <div>
                <Link to="/login">
                    <Button>ПЕРЕЙТИ К АВТОРИЗАЦИИ</Button>
                </Link>

                <Button onClick={reset}>ВЕРНУТЬСЯ К РЕГИСТРАЦИИ</Button>
            </div>
        </Container>
    );
}

AfterLogup.propTypes = {
    reset: PropTypes.func.isRequired,
};

export default AfterLogup;

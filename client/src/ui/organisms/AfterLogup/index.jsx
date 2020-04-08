import PropTypes from 'prop-types';

import React from 'react';
import Svg from 'svg-inline-react';

import Title from 'ui/atoms/Title';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';

import leaderSvg from 'src/resources/svg/leader.svg';

import {
    Container,
    Description,
} from './styled';

function AfterLogup({ reset }) {
    return (
        <Container>
            <Title>СПАСИБО ЗА РЕГИСТРАЦИЮ!</Title>
            <Description>
                Вы успешно завершили процедуру регистрации.
                Теперь вы можете авторизироваться в нашей системе используя
                свои электронную почту и пароль.
            </Description>
            <Svg src={leaderSvg} />
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

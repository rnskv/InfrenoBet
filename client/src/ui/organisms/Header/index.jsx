import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { useActions } from 'src/helpers/hooks';
import { openLoginPopup } from 'src/redux/user/actions';
import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
    StyledButton as Button,
    StyledBalance as Balance,
    ExitButton,
    LoginButton,
    Logo,
    Group,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';
import Link from '../../atoms/Link';

function Header({
    profile,
    logOut,
}) {
    const actions = useActions({ openLoginPopup });
    const isAuth = useSelector((state) => Boolean(state.user.token));

    return (
        <Container>
            <Logo>
                <svg>
                    <use xlinkHref="#currency-logo" />
                </svg>
            </Logo>
            <Group hidden={!isAuth}>
                <Balance value={profile.balance} />
                <Link to="/deposit"><Button type="transparent">Пополнить</Button></Link>
                <Link to="/withdraw"><Button type="transparent">Вывести</Button></Link>
            </Group>
            <Group>
                {
                    isAuth
                        ? <ExitButton type="black" onClick={logOut}>Выйти</ExitButton>
                        : <LoginButton onClick={actions.openLoginPopup}>Войти</LoginButton>
                }
            </Group>
        </Container>
    );
}

Header.propTypes = {
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

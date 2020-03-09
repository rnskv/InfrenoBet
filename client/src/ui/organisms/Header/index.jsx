import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
    StyledButton as Button,
    StyledBalance as Balance,
    ExitButton,
    Logo,
    Group,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';
import Link from '../../atoms/Link';

function BetMaker({
    profile,
    logOut,
}) {
    return (
        <Container>
            <Group>
                <Logo>
                    <svg>
                        <use xlinkHref="#currency-logo" />
                    </svg>
                </Logo>
            </Group>
            <Group>
                <Balance value={profile.balance} />
                <Link to={'/deposit'}><Button type="transparent">Пополнить</Button></Link>
                <Link to={'/withdraw'}><Button type="transparent">Вывести</Button></Link>
            </Group>
            <Group>
                <ExitButton type="black" onClick={logOut}>Выйти</ExitButton>
            </Group>
        </Container>
    );
}

BetMaker.propTypes = {
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);

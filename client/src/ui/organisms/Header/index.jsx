import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    Container,
    StyledButton as Button,
    StyledBalance as Balance,
    Logo,
} from './styled';
import { NavigationIcon } from '../Navigation/styled';

function BetMaker({
    profile,
}) {
    return (
        <Container>
            <Logo>
                <svg>
                    <use xlinkHref={`#currency-logo`} />
                </svg>
            </Logo>
            <Balance value={profile.balance} />
            <Button type="transparent">Пополнить</Button>
            <Button type="transparent">Вывести</Button>
        </Container>
    );
}

BetMaker.propTypes = {
    profile: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BetMaker);

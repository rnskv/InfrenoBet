import PropTypes from 'prop-types';

import React from 'react';
import { useActions } from 'src/helpers/hooks';
import { openLoginPopup } from 'src/redux/user/actions';

import {
    Container,
    LogInButton,
    Title,
} from './styled';

function NotAuthPlaceHolder({ isVisible }) {
    if (!isVisible) return <></>;

    const actions = useActions({ openLoginPopup });

    return (
        <Container>
            <Title>Авторизируйся, чтобы испытать удачу</Title>
            <LogInButton onClick={actions.openLoginPopup}>Авторизироваться</LogInButton>
        </Container>
    );
}

NotAuthPlaceHolder.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default NotAuthPlaceHolder;

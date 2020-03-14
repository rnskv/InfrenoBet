import PropTypes from 'prop-types';

import React from 'react';

import {
    Container,
    LogInButton,
    Title
} from './styled';

function NotAuthPlaceHolder({ isVisible }) {
    if (!isVisible) return <></>;

    return (
        <Container>
            <Title>Авторизируйся, чтобы испытать удачу</Title>
            <LogInButton>Авторизироваться</LogInButton>
        </Container>
    );
}

NotAuthPlaceHolder.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default NotAuthPlaceHolder;

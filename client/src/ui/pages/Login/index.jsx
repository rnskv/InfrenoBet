import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from 'ui/organisms/LoginForm';
import DefaultTemplate from 'ui/templates/Default';

import RoomNavigation from 'ui/organisms/RoomNavigation';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';
import { Alternative, StyledSection } from './styled';
import { mapStateToProps, mapDispatchToProps } from './connect';


function Login({
    isLoading, error, token, logIn,
}) {
    if (token) return <Redirect to="/" />;
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/login"
                title="Авторизация"
            />
            <StyledSection>
                <LoginForm
                    logIn={logIn}
                    error={error}
                    isLoading={isLoading}
                />

                <Alternative>
                    <span>
                        Если вы еще не зарегистрировались в нашей системе,
                        то вы можете сделать это на странице регистрации.
                    </span>
                    <Link to="/logup"><Button type="transparent">Зарегистрироваться</Button></Link>
                </Alternative>
            </StyledSection>
        </DefaultTemplate>
    );
}

Login.propTypes = {
    token: PropTypes.string.isRequired,
    logIn: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

Login.defaultProps = {
    isLoading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import {
    Redirect
} from 'react-router-dom';

import LoginForm from 'ui/organisms/LoginForm';
import DefaultTemplate from 'ui/templates/Default';

import * as userDomains from 'src/redux/user/domains';

function Login({ isLoading, error, token, logIn }) {
    if (token) return <Redirect to={'/'} />
    return (
        <DefaultTemplate>
            { error }
            { isLoading ? 'Loading...' : null}
            <LoginForm logIn={logIn} />
        </DefaultTemplate>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: ({ email, password }) => dispatch(userDomains.logIn({ email, password })),
    };
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        isLoading: state.user.isLoading,
        error: state.user.error,
    };
}

Login.propTypes = {
    token: PropTypes.string.isRequired,
    logIn: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

Login.defaultProps = {
    error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
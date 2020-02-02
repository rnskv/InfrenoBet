import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import LoginForm from 'ui/organisms/LoginForm';
import DefaultTemplate from 'ui/templates/Default';

import * as userDomains from 'src/redux/user/domains';

function Login({ token, logIn }) {
    return (
        <DefaultTemplate>
            { token || 'You are not auth'}
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
    };
}

Login.propTypes = {
    token: PropTypes.string.isRequired,
    logIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

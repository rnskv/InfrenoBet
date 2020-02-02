import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import LoginForm from 'ui/organisms/LoginForm';
import DefaultTemplate from 'ui/templates/Default';

import * as userDomains from 'src/redux/user/domains';

function Login({ token, logIn }) {
    return (
        <DefaultTemplate>
            { token || 'test'}
            <button> Try </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

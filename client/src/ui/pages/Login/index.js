import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import LoginForm from 'ui/organisms/LoginForm';
import DefaultTemplate from 'ui/templates/Default';

import * as userActions from 'src/redux/user/actions';

function Login({ token, test }) {
    return (
        <DefaultTemplate>
            { token || 'test'}
            <button onClick={test}> Try </button>
            <LoginForm />
        </DefaultTemplate>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        test: () => dispatch(userActions.test()),
    };
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

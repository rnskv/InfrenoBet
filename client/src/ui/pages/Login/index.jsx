import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from 'ui/organisms/LoginForm';
import PopupTemplate from 'ui/templates/Popup';

import { mapStateToProps, mapDispatchToProps } from './connect';

function Login({
    isLoading, error, token, logIn,
}) {
    if (token) return <Redirect to="/" />;
    return (
        <PopupTemplate>
            { isLoading ? 'Loading...' : null}
            <LoginForm logIn={logIn} error={error} />
        </PopupTemplate>
    );
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

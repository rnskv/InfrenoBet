import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import {
    Redirect,
} from 'react-router-dom';

import LogupForm from 'ui/organisms/LogupForm';
import PopupTemplate from 'ui/templates/Popup';


import * as userDomains from 'src/redux/user/domains';
import * as userActions from 'src/redux/user/actions';
import AfterLogup from './AfterLogup';

function Logup({
    isLoading, isRegister, error, token, logUp, reset
}) {
    if (token) return <Redirect to="/" />;

    return (
        <PopupTemplate>
            { error }
            { isLoading ? 'Loading...' : null}

            { isRegister ? <AfterLogup reset={reset}/> : <LogupForm logUp={logUp} /> }

        </PopupTemplate>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        logUp: (data) => dispatch(userDomains.logUp(data)),
        reset: () => dispatch(userActions.reset()),
    };
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        isLoading: state.user.isLoading,
        isRegister: state.user.isRegister,
        error: state.user.error,
    };
}

Logup.propTypes = {
    token: PropTypes.string.isRequired,
    logUp: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isRegister: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

Logup.defaultProps = {
    error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Logup);

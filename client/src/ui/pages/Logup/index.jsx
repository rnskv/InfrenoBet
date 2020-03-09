import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import {
    Redirect,
} from 'react-router-dom';

import LogupForm from 'ui/organisms/LogupForm';
import AfterLogup from 'ui/organisms/AfterLogup';
import PopupTemplate from 'ui/templates/Popup';
import DefaultTemplate from 'ui/templates/Default';

import { mapStateToProps, mapDispatchToProps } from './connect';

function Logup({
    isLoading, isRegister, error, token, logUp, reset,
}) {
    // if (token) return <Redirect to="/" />;

    return (
        <PopupTemplate>
            { isLoading ? 'Loading...' : null}

            { isRegister
                ? (
                    <AfterLogup
                        reset={reset}
                    />
                )
                : (
                    <LogupForm
                        logUp={logUp}
                        error={error}
                    />
                )}

        </PopupTemplate>
    );
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

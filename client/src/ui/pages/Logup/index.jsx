import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import {
    Redirect,
} from 'react-router-dom';

import LogupForm from 'ui/organisms/LogupForm';
import AfterLogup from 'ui/organisms/AfterLogup';
import DefaultTemplate from 'ui/templates/Default';

import { mapStateToProps, mapDispatchToProps } from './connect';

function Logup({
    isLoading, isRegister, error, token, logUp, reset,
}) {
    // if (token) return <Redirect to="/" />;

    return (
        <DefaultTemplate>
            { isRegister
                ? (
                    <AfterLogup
                        reset={reset}
                    />
                )
                : (
                    <LogupForm
                        logUp={logUp}
                        isLoading={isLoading}
                    />
                )}

        </DefaultTemplate>
    );
}

Logup.propTypes = {
    token: PropTypes.string.isRequired,
    logUp: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isRegister: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
};

Logup.defaultProps = {
    isLoading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logup);

import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';

import LogupForm from 'ui/organisms/LogupForm';
import AfterLogup from 'ui/organisms/AfterLogup';
import DefaultTemplate from 'ui/templates/Default';

import RoomNavigation from 'ui/organisms/RoomNavigation';
import Link from 'ui/atoms/Link';
import Button from 'ui/atoms/Button';
import { mapStateToProps, mapDispatchToProps } from './connect';

import {
    Alternative,
    StyledSection,
} from './styled';

function Logup({
    isLoading, isRegister, error, token, logUp, reset,
}) {
    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/logup"
                title="Регистрация"
            />
            <StyledSection>
                {isRegister
                    ? <AfterLogup reset={reset} />
                    : (
                        <>
                            <LogupForm
                                logUp={logUp}
                                isLoading={isLoading}
                            />

                            <Alternative>
                                <span>
                                Если вы уже зарегистрированы в нашей системе,
                                то на сайт можно зайти используя уже существующие данные.
                                </span>
                                <Link to="/login"><Button type="transparent">Войти</Button></Link>
                            </Alternative>
                        </>
                    )}
            </StyledSection>
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

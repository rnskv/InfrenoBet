import PropTypes from 'prop-types';
import React from 'react';

import { AgeConfirm, StyledCheckbox } from './styled';


function VerifyAge({
    onChange,
    isVerified,
}) {
    return (
        <AgeConfirm>
            <StyledCheckbox
                onChange={onChange}
                checked={isVerified}
            />
            {'Мне уже исполнилось 18 лет, а так же я ознакомился с '}
            <a>правилами и условиями</a>
        </AgeConfirm>
    );
}

VerifyAge.propTypes = {
    onChange: PropTypes.func.isRequired,
    isVerified: PropTypes.bool,
};

VerifyAge.defaultProps = {
    isVerified: false,
};

export default VerifyAge;

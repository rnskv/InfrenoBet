import PropTypes from 'prop-types';
import React from 'react';

import { AgeConfirm, StyledCheckbox } from './styled';
import Link from 'ui/atoms/Link';


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
            <Link to="/faq">правилами и условиями</Link>
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

import PropTypes from 'prop-types';
import React from 'react';

import { Container, StyledCheckbox } from './styled';


function Verify({
    onChange,
    isVerified,
    text,
}) {
    return (
        <Container>
            <StyledCheckbox
                onChange={onChange}
                checked={isVerified}
            />
            { text }
        </Container>
    );
}

Verify.propTypes = {
    onChange: PropTypes.func.isRequired,
    isVerified: PropTypes.bool,
};

Verify.defaultProps = {
    isVerified: false,
};

export default Verify;

import PropTypes from 'prop-types';
import React from 'react';

import Loader from 'ui/atoms/Loader';
import { Container } from './styled';

function ModuleLoader({ isLoading }) {
    if (!isLoading) return <></>;

    return (
        <Container>
            <Loader isStyled color="white" size="big" />
        </Container>
    );
}

ModuleLoader.propTypes = {
    isLoading: PropTypes.bool,
};

ModuleLoader.defaultProps = {
    isLoading: false
};

export default ModuleLoader;

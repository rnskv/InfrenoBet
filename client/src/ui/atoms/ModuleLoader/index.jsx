import PropTypes from 'prop-types';
import React from 'react';

import Loader from 'ui/atoms/Loader';
import { Container, LoadingPage } from './styled';

function ModuleLoader({ isLoading, fullScreen }) {
    if (!isLoading) return <></>;

    return (
        <Container fullScreen={fullScreen}>
            {
                fullScreen ? <LoadingPage src={'/dist/resources/images/loading.gif'}/> : <Loader isStyled color="white" size="big" />
            }
        </Container>
    );
}

ModuleLoader.propTypes = {
    isLoading: PropTypes.bool,
};

ModuleLoader.defaultProps = {
    isLoading: false,
};

export default ModuleLoader;

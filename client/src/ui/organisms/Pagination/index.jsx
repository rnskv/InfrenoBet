import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import {
    Container,
    Button
} from './styled';


function Pagination({
    isFirstPage, isLastPage, onNextClick, onPrevClick, isLoading, buttonsType,
}) {
    return (
        <Container>
            <Button
                disabled={isFirstPage || isLoading}
                onClick={onPrevClick}
                type={buttonsType}
            >
                Предыдущая
            </Button>
            <Button
                disabled={isLastPage || isLoading}
                onClick={onNextClick}
                type={buttonsType}
            >
                Следующая
            </Button>
        </Container>

    );
}

Pagination.propTypes = {
    onNextClick: PropTypes.func.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    buttonsType: PropTypes.string,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    isLoading: PropTypes.bool,
};

Pagination.defaultProps = {
    isFirstPage: true,
    buttonsType: 'yellow',
    isLastPage: false,
    isLoading: false,
};

export default Pagination;

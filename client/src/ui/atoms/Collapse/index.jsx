import PropTypes from 'prop-types';
import React from 'react';

import {
    Container,
} from './styled';

function Collapse({ className, style, side, isOpened, onClick, backgroundColor }) {
    return (
        <Container
            className={className}
            style={style}
            backgroundColor={backgroundColor}
            isOpened={isOpened}
            onClick={onClick}
            side={side}
        >
            <svg>
                <use xlinkHref="#collapse" />
            </svg>
        </Container>
    );
}

Collapse.propTypes = {
    side: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpened: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

Collapse.defaultProps = {
    backgroundColor: 'transparent',
    isOpened: true,
};

export default Collapse;

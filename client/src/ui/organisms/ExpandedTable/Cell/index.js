import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import {
    Td,
} from './styled';

function Cell({
    children,
}) {
    return (
        <Td>
            { children }
        </Td>
    );
}

Cell.propTypes = {
};

export default Cell;

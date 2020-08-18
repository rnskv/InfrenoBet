import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import {
    Container,
} from './styled';

function Row({
    children,
}) {
    return (
        <tr>
            { children }
        </tr>
    );
}

Row.propTypes = {
};

export default Row;

import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import {
    TBody,
} from './styled';

function Table({
    children,
}) {
    return (
        <TBody>
            { children }
        </TBody>
    );
}

Table.propTypes = {
};

export default Table;

import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import {
    Container,
} from './styled';

function ExpandedTable({
    children,
}) {
    return (
        <Container>
            { children }
        </Container>
    );
}

ExpandedTable.propTypes = {
};

export default ExpandedTable;

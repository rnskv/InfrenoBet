import PropTypes from 'prop-types';
import React from 'react';

function If({ condition, children }) {
    return condition === true ? children : <></>;
}

If.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
};

export default If;

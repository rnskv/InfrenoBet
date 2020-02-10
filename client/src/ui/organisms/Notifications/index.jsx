import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import {
    Container,
    StyledForm,
    Label,
    Name,
} from './styled';

function Notifications({ notifications }) {
    return (
        <ul>
            {
                notifications.map((notification) => <li>{notification.text}</li>)
            }
        </ul>
    )
}

Notifications.propTypes = {
    logUp: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default LogupForm;

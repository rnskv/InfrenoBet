import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { openAuthSteamWindow } from 'src/helpers/auth';
import Input from 'ui/atoms/Input';

import {
    Container,
    Tab
} from './styled';
import Link from 'ui/atoms/Link';

function Tabs({ tabs }) {
    const location = useLocation();
    return (
        <Container>
            {
                tabs.map((tab => {
                    return <Tab isActive={tab.url === location.pathname}>
                        <Link to={tab.url}>{ tab.title }</Link>
                    </Tab>
                }))
            }
        </Container>
    );
}

Tabs.propTypes = {
    children: PropTypes.node,
};

Tabs.defaultProps = {
};

export default Tabs;

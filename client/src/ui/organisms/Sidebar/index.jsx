import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Container,
    Wrapper,
    Collapse,
} from './styled';

export const StateContext = React.createContext({ isOpened: true });

function Sidebar({ children, token }) {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <StateContext.Provider value={{ isOpened }}>
            <Container isOpened={isOpened}>
                <Collapse isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
                    <svg>
                        <use xlinkHref="#collapse" />
                    </svg>
                </Collapse>
                <Wrapper>
                    { children }
                </Wrapper>
            </Container>
        </StateContext.Provider>
    );
}

Sidebar.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Sidebar;

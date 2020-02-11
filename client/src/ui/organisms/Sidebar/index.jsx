import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    StaticContainer,
    FixedContainer,
    Wrapper,
    Collapse,
} from './styled';

export const StateContext = React.createContext({ isOpened: true });

function Sidebar({ children, token, params }) {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <StateContext.Provider value={{ isOpened }}>
            <StaticContainer isOpened={isOpened} {...params}>
                <FixedContainer>
                    <Collapse isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
                        <svg>
                            <use xlinkHref="#collapse" />
                        </svg>
                    </Collapse>
                    <Wrapper>
                        { children }
                    </Wrapper>
                </FixedContainer>
            </StaticContainer>
        </StateContext.Provider>
    );
}

Sidebar.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Sidebar;

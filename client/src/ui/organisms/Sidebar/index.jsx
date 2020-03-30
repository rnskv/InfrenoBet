import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Collapse from 'ui/atoms/Collapse';
import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    StaticContainer,
    FixedContainer,
    Wrapper,
} from './styled';

export const StateContext = React.createContext({ isOpened: false });
const Sidebar = React.memo(({
    children, params, sidebars, open, close,
}) => {
    // const [isOpened, setIsOpened] = useState(false);

    const { isOpened } = sidebars[params.side];

    const clickHandler = () => {
        if (isOpened) {
            close({ side: params.side });
        } else {
            open({ side: params.side });
        }
    };

    const collapseColors = {
        left: 'var(--color-grey-400)',
        right: 'var(--color-grey-600)',
    };

    return (
        <StateContext.Provider value={{ isOpened }}>
            <StaticContainer isOpened={isOpened} {...params}>
                <FixedContainer>
                    <Collapse
                        isOpened={isOpened}
                        onClick={clickHandler}
                        side={params.side}
                        backgroundColor={collapseColors[params.side]}
                    >
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
}, (prevProps, nextProps) => prevProps.sidebars[prevProps.params.side] === nextProps.sidebars[nextProps.params.side]);

Sidebar.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

import {
    Container,
    Background,
} from './styled';

const duration = 300;

const backgroundTransitionStyle = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, pointerEvents: 'none' },
};

const containerTransitionStyle = {
    entering: { marginTop: 0 },
    entered: { marginTop: 0 },
    exiting: { marginTop: -50 },
    exited: { marginTop: -50, pointerEvents: 'none' },
};

function Popup({
    isVisible, close, className, style, children,
}) {
    return (
        <Transition in={isVisible} timeout={{ enter: duration, exit: duration }}>
            {
                (state) => (
                    <Background
                        onClick={(e) => e.target === e.currentTarget && close()}
                        style={{
                            transition: `${duration}ms ease-in-out`,
                            opacity: 0,
                            ...backgroundTransitionStyle[state],
                        }}
                    >
                        <Container
                            onClick={(e) => {
                                // e.stopPropagation();
                            }}
                            className={className}
                            style={{
                                transition: `${duration}ms ease-in-out`,
                                marginTop: -50,
                                ...containerTransitionStyle[state],
                            }}
                        >
                            { children }
                        </Container>
                    </Background>
                )
            }
        </Transition>
    );
}

Popup.propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
    close: PropTypes.func.isRequired,
};

Popup.defaultProps = {
    isVisible: false,
    children: 'Please forward content.',
};

export default Popup;

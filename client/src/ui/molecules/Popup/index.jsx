import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';

import {
    Container,
    Background,
} from './styled';

const duration = 300;

const backgroundTransitionStyle = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { marginTop: 0 },
    exited: { opacity: 0 },
};

const containerTransitionStyle = {
    entering: { marginTop: 0 },
    entered: { marginTop: 0 },
    exiting: { marginTop: -50 },
    exited: { marginTop: -50 },
};

function Popup({
    isVisible, close, className, style, children,
}) {
    useEffect(() => {
        document.querySelector('body').style.overflow = isVisible ? 'hidden' : 'auto';
    }, [isVisible]);

    return (
        <Transition
            onEnter={(node) => node.offsetHeight}
            unmountOnExit
            in={isVisible}
            timeout={{ appear: 0, enter: 0, exit: duration }}
        >
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

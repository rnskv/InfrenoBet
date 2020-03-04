import PropTypes from 'prop-types';
import React from 'react';

import {
    Link,
} from 'react-router-dom';

import {
    NavigationDescription,
    NavigationIcon,
    NavigationItem,
    NavigationName,
    NavigationText,
} from './styled';

function NavigationLink({
    to, isOpened, text, description, isActive, isVisible, svgId,
}) {
    if (!isVisible) return null;

    return (
        <Link to={to}>
            <NavigationItem isOpened={isOpened} isActive={isActive}>
                <NavigationIcon>
                    <svg>
                        <use xlinkHref={`#${svgId}`} />
                    </svg>
                </NavigationIcon>
                <NavigationName isOpened={isOpened}>
                    <NavigationText>
                        { text }
                    </NavigationText>
                    <NavigationDescription>
                        { description }
                    </NavigationDescription>
                </NavigationName>
            </NavigationItem>
        </Link>
    );
}

NavigationLink.propTypes = {
    to: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    svgId: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default NavigationLink;

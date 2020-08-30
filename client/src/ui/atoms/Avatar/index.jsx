import PropTypes from 'prop-types';
import React from 'react';
import { getLevelIndexByExperience } from 'shared/helpers/levels';

import {
    Container,
    Level,
    Image,
} from './styled';

function Avatar({ src, className, style, hidden, experience = null }) {
    const level = getLevelIndexByExperience(experience);
    return (
        <Container className={className} style={style}>
            <Image src={src} />
            { experience !== null && <Level level={level}>{level}</Level> }
        </Container>
    );
}

Avatar.propTypes = {
};

export default Avatar;

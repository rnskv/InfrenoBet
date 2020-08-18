import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'ui/atoms/Loader';
import { usePopupsActions } from 'src/redux/user/hooks/actions';

import { getExchangedSum } from 'src/helpers/system';
import {
    Container,
    Icon,
    Wrapper,
    Image,
    Awards,
    Experience,
    LevelTitle,
} from './styled';
import { getAwardForLevel, getExperienceForLevel } from 'shared/helpers/levels';

function Level({ index }) {
    const number = index + 1;
    const experience = getExperienceForLevel(index);
    const award = getAwardForLevel(index);

    return (
        <Container>
            <LevelTitle>
                Уровень:
                {' '}
                <b>{ number }</b>
            </LevelTitle>
            <Wrapper>
                <Awards>
                    Награда:
                    <span>{ getExchangedSum(award) }</span>
                </Awards>
                <Image src="/dist/resources/images/rank-star.png" />
                <Experience>
                    Опыт:
                    <span>
                        { experience }
XP
                    </span>
                </Experience>
            </Wrapper>
        </Container>
    );
}

Level.propTypes = {
    index: PropTypes.number,
};

Level.defaultProps = {
    index: 0,
};

export default Level;

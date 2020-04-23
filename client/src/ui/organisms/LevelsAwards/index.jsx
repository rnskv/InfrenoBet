import PropTypes from 'prop-types';

import React, { useRef } from 'react';
import Level from 'ui/organisms/LevelsAwards/Level';
import { Scrollbars } from 'react-custom-scrollbars';

import { Horizontal } from 'ui/organisms/GameHistory/styled';
import HorizontalSlider from 'ui/molecules/HorizontalSlider';
import Button from 'ui/atoms/Button';
import { getExperienceForLevel, getLevelIndexByExperience } from 'shared/helpers/levels';
import { useLevelActions } from 'src/redux/user/hooks/actions';
import { useProfile } from 'src/redux/user/hooks/selectors';
import AwardButton from 'ui/organisms/LevelsAwards/Button';
import { getExchangedSum } from 'src/helpers/system';
import {
    Container,
    AwardsContainer,
    Vertical,
    ExperienceContainer,
    Description,
    Yellow,
    Blue,
} from './styled';


function LevelsAwards() {
    const profile = useProfile();

    const currentExperience = profile.experience;
    const currentLevel = getLevelIndexByExperience(currentExperience) + 1;
    const { receivedAwards } = profile;

    const nextLevelExperience = getExperienceForLevel(currentLevel + 1);
    const LEVELS = new Array(currentLevel + 25).fill('');

    return (
        <Container>
            <ExperienceContainer>
                До следующего уровня:
                {' '}
                {currentExperience}
                <span>
                        /
                    {' '}
                    { nextLevelExperience }
                    XP
                </span>
            </ExperienceContainer>
            <Description>
                <p>
                    Каждый раз делая ставку, Вы получаете опыт
                    из рассчета

                    <Yellow>
                        {' '}
                        { getExchangedSum(0.01) }
                        {' '}
                    </Yellow>
                    за
                    <Blue> 1 еденицу опыта </Blue>
                    .
                    Накапливая опыт*, Вы повышаете свой уровень.
                    <b>
                        *После достижения определенного уровня - опыт не обнуляется,
                        вы продолжаете накапливать его.
                    </b>
                </p>
            </Description>
            <HorizontalSlider initialPage={Math.floor(receivedAwards / 4)}>
                <AwardsContainer>
                    {
                        LEVELS.map((number, index) => (
                            <Vertical>
                                <Level index={index} key={index} />
                                <AwardButton lvl={index + 1} />
                            </Vertical>
                        ))
                    }
                </AwardsContainer>
            </HorizontalSlider>
        </Container>
    );
}

LevelsAwards.propTypes = {
};

LevelsAwards.defaultProps = {
};

export default LevelsAwards;

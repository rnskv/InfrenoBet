import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'ui/atoms/Avatar';
import { getExperienceForLevel, getLevelIndexByExperience } from 'shared/helpers/levels';
import { mapDispatchToProps, mapStateToProps } from './connect';


import {
    Container,
    TotalExperienceBar,
    ExperienceBar,
    Name,
    Level,
    Experience,
    Wrapper,
    Information,
    Loader,
} from './styled';
import { NavigationIcon } from '../../organisms/Navigation/styled';

function renderLoader() {
    return (
        <Loader>
            <svg>
                <use xlinkHref="#spinner" />
            </svg>
        </Loader>
    );
}

function SidebarProfile({
    profile, token, className, style,
}) {
    if (!token) return null;
    const lvlIndex = getLevelIndexByExperience(profile.experience);
    const nextLevelExperience = getExperienceForLevel(lvlIndex + 1);
    const currentLevelExperience = getExperienceForLevel(lvlIndex);

    return (
        <Container className={className} style={style}>
            {
                profile.isLoading
                    ? renderLoader()
                    : (
                        <>
                            <Avatar src={profile.avatar || 'https://vk.com/images/deactivated_100.png?ava=1'} />
                            <Wrapper>
                                <Name>{ profile.name || '%name%'}</Name>
                                <TotalExperienceBar>
                                    <ExperienceBar percent={
                                        Math.floor(profile.experience - currentLevelExperience)
                                        / (nextLevelExperience - currentLevelExperience) * 100
                                    }
                                    />
                                </TotalExperienceBar>
                                <Information>
                                    <Level>
                                        { `LVL ${lvlIndex + 1}` }
                                    </Level>
                                    <Experience>
                                        { `${Math.floor(profile.experience)} / ${nextLevelExperience}XP` }
                                    </Experience>
                                </Information>
                            </Wrapper>
                        </>
                    )
            }
        </Container>
    );
}

SidebarProfile.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProfile);

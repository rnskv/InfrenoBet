import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'ui/atoms/Avatar';
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
    Loader
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
                                    <ExperienceBar />
                                </TotalExperienceBar>
                                <Information>
                                    <Level>LVL 25</Level>
                                    <Experience>100500/30000XP</Experience>
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

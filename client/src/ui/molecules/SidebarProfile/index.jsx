import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './connect';

import Avatar from 'ui/atoms/Avatar';

import {
    Container,
    TotalExperienceBar,
    ExperienceBar,
    Name,
    Level,
    Experience,
    Wrapper,
    Information
} from './styled';

function SidebarProfile({ profile, className, style }) {
    console.log(profile);
    return (
        <Container className={className} style={style}>
            <Avatar src={profile.avatar} />
            <Wrapper>
                <Name>{ profile.name }</Name>
                <TotalExperienceBar>
                    <ExperienceBar />
                </TotalExperienceBar>
                <Information>
                    <Level>LVL 25</Level>
                    <Experience>100500/30000XP</Experience>
                </Information>
            </Wrapper>
        </Container>
    );
}

SidebarProfile.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProfile);

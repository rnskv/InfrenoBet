import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import Tabs from 'ui/molecules/Tabs';
import Section from 'ui/atoms/Section';
import { useProfile } from 'src/redux/user/hooks/selectors';
import SocialLinks from 'ui/molecules/SocialLinks';
import ProfileHead from 'ui/organisms/ProfileHead';
import TABS from 'src/configs/account-tabs';
import NotAccessPlaceholder from 'ui/organisms/NotAccessPlaceholder';
import LevelsAwards from 'ui/organisms/LevelsAwards';

function Levels() {
    const profile = useProfile();

    return (
        <DefaultTemplate prevContent={[<ProfileHead />]}>
            <Tabs
                tabs={TABS}
            />
            <Section>
                <LevelsAwards/>

            </Section>
        </DefaultTemplate>
    );
}

Levels.propTypes = {
};

Levels.defaultProps = {
};

export default Levels;

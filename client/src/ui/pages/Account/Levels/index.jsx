import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import Tabs from 'ui/molecules/Tabs';
import Section from 'ui/atoms/Section';
import { useProfile } from 'src/redux/user/hooks/selectors';
import SocialLinks from 'ui/molecules/SocialLinks';
import ProfileHead from 'ui/organisms/ProfileHead';
import TABS from 'src/configs/account-tabs';

function Levels() {
    const profile = useProfile();

    return (
        <DefaultTemplate prevContent={[<ProfileHead />]}>
            <Tabs
                tabs={TABS}
            />
            <Section>
                Уровни
            </Section>
        </DefaultTemplate>
    );
}

Levels.propTypes = {
};

Levels.defaultProps = {
};

export default Levels;

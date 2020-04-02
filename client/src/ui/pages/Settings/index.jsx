import PropTypes from 'prop-types';
import React from 'react';

import DefaultTemplate from 'ui/templates/Default';
import RoomNavigation from 'ui/organisms/RoomNavigation';
import Section from 'ui/atoms/Section';
import { useProfile } from 'src/redux/user/hooks/selectors';
import SocialLinks from 'ui/molecules/SocialLinks';

function Settings() {
    const profile = useProfile();

    return (
        <DefaultTemplate>
            <RoomNavigation
                url="/settings"
                title="Настройки"
            />
            <Section>
                <SocialLinks />
            </Section>
        </DefaultTemplate>
    );
}

Settings.propTypes = {
};

Settings.defaultProps = {
};

export default Settings;

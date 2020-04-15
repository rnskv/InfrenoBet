import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import DefaultTemplate from 'ui/templates/Default';
import Tabs from 'ui/molecules/Tabs';
import Section from 'ui/atoms/Section';
import { useProfile } from 'src/redux/user/hooks/selectors';
import SocialLinks from 'ui/molecules/SocialLinks';
import ProfileHead from 'ui/organisms/ProfileHead';
import TABS from 'src/configs/account-tabs';
import NotAccessPlaceholder from 'ui/organisms/NotAccessPlaceholder';
import ReferralForm from 'ui/organisms/ReferralForm';
import ReferralLevel from 'ui/organisms/ReferralLevel';
import ReferralBalance from 'ui/organisms/ReferralBalance';
import ReferralInit from 'ui/organisms/ReferralInit';

import { useReferralsActions, useReferralsDomains } from 'src/redux/referrals/hooks/actions';
import { useReferralsLoaders, useReferralsStatistics } from 'src/redux/referrals/hooks/selectors';
import ModuleLoader from 'ui/atoms/ModuleLoader';

const Wrapper = styled.div`
  position: relative;
  min-height: 600px;
`;

function Referrals() {
    const profile = useProfile();
    const actions = useReferralsActions();
    const domains = useReferralsDomains();
    const statistics = useReferralsStatistics();
    const loaders = useReferralsLoaders();

    useEffect(() => {
        domains.getMyStatistics();
    }, []);

    return (
        <DefaultTemplate prevContent={[<ProfileHead />]}>
            <Tabs
                tabs={TABS}
            />
            <Wrapper>
                <ModuleLoader isLoading={loaders.statisticsIsLoading } />
                <ReferralInit isVisible={!profile.isLoading && !profile.referralCode} />
                <ReferralForm />
                <ReferralLevel users={statistics.users} totalCount={statistics.totalCount }/>
                <ReferralBalance amount={statistics.amount} />
            </Wrapper>
        </DefaultTemplate>
    );
}

Referrals.propTypes = {
};

Referrals.defaultProps = {
};

export default Referrals;

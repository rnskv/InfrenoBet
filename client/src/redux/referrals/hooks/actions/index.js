import { useActions } from 'src/helpers/hooks';
import { infernoClient } from 'src/index';

export const useReferralsActions = () => useActions(infernoClient.modules.store.actions.referrals);
export const useReferralsDomains = () => useActions(infernoClient.modules.store.domains.referrals);

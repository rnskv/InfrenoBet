import { useActions } from 'src/helpers/hooks';
import { infernoClient } from 'src/index';

const { removeAllNotifications, addNotification } = infernoClient.modules.store.actions.user;
const { getProfile } = infernoClient.modules.store.domains.user;

export const useNotificationActions = () => useActions({ removeAllNotifications, addNotification });

export const userProfileActions = () => useActions({ getProfile });

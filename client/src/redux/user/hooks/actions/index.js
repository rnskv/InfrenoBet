import { useActions } from 'src/helpers/hooks';
import { infernoClient } from 'src/index';

const {
    removeAllNotifications,
    addNotification,
    closeLoginPopup,
    openLoginPopup,
    closeSteamInventory,
    openSteamInventory,
    changeSidebarTab,
} = infernoClient.modules.store.actions.user;

const { getProfile } = infernoClient.modules.store.domains.user;

export const useNotificationActions = () => useActions({ removeAllNotifications, addNotification });

export const userProfileActions = () => useActions({ getProfile });

export const usePopupsActions = () => useActions({
    closeLoginPopup,
    openLoginPopup,
    closeSteamInventory,
    openSteamInventory,
});

export const useSidebarActions = () => useActions({
    changeTab: changeSidebarTab,
});

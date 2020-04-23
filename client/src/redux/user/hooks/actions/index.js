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
    openSidebar,
    closeSidebar,
} = infernoClient.modules.store.actions.user;

const { getProfile, getAward } = infernoClient.modules.store.domains.user;

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
    open: openSidebar,
    close: closeSidebar,
});

export const useLevelActions = () => useActions({
    getAward,
});

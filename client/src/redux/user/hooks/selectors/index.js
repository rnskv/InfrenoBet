import { useSelector } from 'react-redux';

const SELECTOR = {
    profile: (state) => state.user.profile,
    sidebar: (state) => ({
        activeTabName: state.user.activeSidebarTabName,
        notifications: state.user.notifications,
    }),
    steamInventory: (state) => ({
        isVisible: state.user.isOpenedSteamInventory,
    }),
};

export const useProfile = () => useSelector(SELECTOR.profile);
export const useSidebar = () => useSelector(SELECTOR.sidebar);
export const useSteamInventorySelector = () => useSelector(SELECTOR.steamInventory);

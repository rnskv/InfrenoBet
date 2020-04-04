import { useSelector } from 'react-redux';

const SELECTOR = {
    profile: (state) => state.user.profile,
};

export const useProfile = () => useSelector((state) => state.user.profile);

export const useSteamInventorySelector = () => useSelector((state) => ({
    isVisible: state.user.isOpenedSteamInventory,
}));
import { useSelector } from 'react-redux';

const SELECTOR = {
    profile: state => state.user.profile,
};

export const useProfile = () => {
    return useSelector(state => state.user.profile);
};

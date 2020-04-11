import { useSelector } from 'react-redux';

const SELECTOR = {
    lastWinner: (state) => state.game.lastWinner,
    greatestWinner: (state) => state.game.greatestWinner,
    luckyWinner: ((state) => state.game.luckyWinner),
};

export const useLastWinner = () => useSelector(SELECTOR.lastWinner);
export const useGreatestWinner = () => useSelector(SELECTOR.greatestWinner);
export const useLuckyWinner = () => useSelector(SELECTOR.luckyWinner);

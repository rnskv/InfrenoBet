import userReducer from './user/reducer';
import gameReducer from './game/reducer';
import betMakerReducer from './betMaker/reducer';
import cashierReducer from './cashier/reducer';

export default {
    user: userReducer,
    game: gameReducer,
    betMaker: betMakerReducer,
    cashier: cashierReducer,
};

import * as userActions from 'src/redux/user/actions';
import * as gameActions from 'src/redux/game/actions';
import * as betMakerActions from 'src/redux/betMaker/actions';
import * as cashierActions from 'src/redux/cashier/actions';

export default {
    user: userActions,
    game: gameActions,
    betMaker: betMakerActions,
    cashier: cashierActions,
};

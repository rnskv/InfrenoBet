import history from 'src/modules/router/history';
import { ws } from 'src/modules/realtime';
import * as gameDomains from 'src/redux/game/domains';
import * as actions from './actions';

export const sendTransaction = ({ values }) => async (dispatch) => {
    dispatch(gameDomains.transaction({ values }));
    dispatch(actions.close());
};

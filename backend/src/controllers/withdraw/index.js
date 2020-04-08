import Controller from 'src/core/Controller';
import * as actions from './actions';
import * as swiftActions from './swiftActions';

export default new Controller({ prefix: '/withdraw', actions: {...actions, ...swiftActions} });

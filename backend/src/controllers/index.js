import Router from 'koa-router';
import auth from './auth/index.js';
import root from './root/index.js';
import users from './users/index.js';
import games from './games/index.js';
import bets from './bets/index.js';
import items from './items/index.js';
import payment from './payment/index.js';
import withdraw from './withdraw/index.js';
import tradeoffers from './tradeoffers/index.js';
import commissions from './commissions/index.js';
import referrals from './referrals/index.js';

const router = new Router().prefix('/api');

router.use(auth.routes);
router.use(root.routes);
router.use(users.routes);
router.use(games.routes);
router.use(bets.routes);
router.use(items.routes);
router.use(payment.routes);
router.use(withdraw.routes);
router.use(tradeoffers.routes);
router.use(commissions.routes);
router.use(referrals.routes);

export default router;

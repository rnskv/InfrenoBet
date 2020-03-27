import Router from 'koa-router';
import auth from './auth/index.js';
import root from './root/index.js';
import users from './users/index.js';
import games from './games/index.js';
import bets from './bets/index.js';
import items from './items/index.js';
import payment from './payment/index.js';

const router = new Router().prefix('/api');

router.use(auth.routes);
router.use(root.routes);
router.use(users.routes);
router.use(games.routes);
router.use(bets.routes);
router.use(items.routes);
router.use(payment.routes);

export default router;

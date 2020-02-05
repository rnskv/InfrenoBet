import Router from 'koa-router';
import auth from './auth/index.js';
import root from './root/index.js';
import users from './users/index.js';
import games from './games/index.js';
import transactions from './transactions/index.js';

const router = new Router().prefix('/api');

router.use(auth.routes);
router.use(root.routes);
router.use(users.routes);
router.use(games.routes);
router.use(transactions.routes);

export default router;

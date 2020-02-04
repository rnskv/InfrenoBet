import Router from 'koa-router';
import auth from './auth/index.js';
import root from './root/index.js';
import users from './users/index.js';

const router = new Router().prefix('/api');

router.use(auth.routes);
router.use(root.routes);
router.use(users.routes);

export default router;

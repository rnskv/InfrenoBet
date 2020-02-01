import Router from 'koa-router';
import auth from './auth/index.js';
import root from './root/index.js';

const router = new Router().prefix('/api');

router.use(auth.routes);
router.use(root.routes);

export default router;

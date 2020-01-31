import Router from 'koa-router';
import auth from './auth';
import root from './root';

const router = new Router().prefix('/api');

router.use(auth);
router.use(root);

export default router;

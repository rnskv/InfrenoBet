import 'dotenv/config';
import Koa from 'koa';
import config from './config.js';
import { useMiddlewares } from './middlewares';
import { connectMongo } from './modules/mongo';
import controllers from './controllers';

const app = new Koa();

connectMongo();

useMiddlewares(app);

app.use(controllers.routes());
app.use(controllers.allowedMethods());

app.listen(config.port, config.host, () => {
    console.log(`Server has been started on port ${config.port}`);
});

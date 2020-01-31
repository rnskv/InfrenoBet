import 'dotenv/config';
import config from './config.js';
import Koa from 'koa';
import { useMiddlewares } from "./middlewares";
import { connectMongo } from './modules/mongo';
import controllers from './controllers';

const app = new Koa();

connectMongo();

useMiddlewares(app);

app.use(controllers.routes());
app.use(controllers.allowedMethods());

app.listen(config.port, () => {
    console.log(`Server has been started on port ${config.port}`);
});

console.log('123', config.port);
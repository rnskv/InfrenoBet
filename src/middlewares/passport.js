import passport from 'koa-passport';
import { useAuthentificator } from 'src/modules/authentificator';

useAuthentificator(passport);

export default passport.initialize();

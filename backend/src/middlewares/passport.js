import passport from 'koa-passport';
import { usePassportStrategies } from 'src/modules/passportStrategies';
import User from 'src/models/User';

usePassportStrategies(passport);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });
});

export default passport.initialize();

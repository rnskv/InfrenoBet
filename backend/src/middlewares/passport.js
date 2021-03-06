import passport from 'koa-passport';
import { usePassportStrategies } from 'src/modules/passportStrategies';
import User from 'src/models/User';

usePassportStrategies(passport);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });
});

export default passport.initialize();

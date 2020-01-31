import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import User from 'src/models/User';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export const useAuthentificator = (passport) => {
    const JwtStrategy = new Strategy(options, async (payload, done) => {
        const user = await User.findById(payload.id);

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    });

    passport.use(JwtStrategy)
};
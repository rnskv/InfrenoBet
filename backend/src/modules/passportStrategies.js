import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// const VKontakteStrategy = require('passport-vkontakte').Strategy;
import VkTokenStrategy from 'passport-vkontakte-token';
import config from 'src/config';
import User from 'src/models/User';

const { VK_CLIENT_ID, VK_CLIENT_SECRET, VK_REDIRECT_URL } = process.env;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    session: false
};

export const usePassportStrategies = (passport) => {
    const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
        const user = await User.findById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

    const vkStrategy = new VkTokenStrategy({
            clientID: VK_CLIENT_ID,
            clientSecret: VK_CLIENT_SECRET,
            callbackURL:  VK_REDIRECT_URL
        },
        function(accessToken, refreshToken, profile, next) {
            User.findOne({ vkId: profile.id }, (error, user) => {
                return next(error, user);
            });
        }
    );

    passport.use(jwtStrategy);
    passport.use(vkStrategy);
};

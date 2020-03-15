import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// const VKontakteStrategy = require('passport-vkontakte').Strategy;
import VkTokenStrategy from 'passport-vkontakte-token';
import config from 'src/config';
import User from 'src/models/User';

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
            clientID:     '7163980', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: 'bjGIRHQtGTOyoSA349VX',
            callbackURL:  "http://127.0.0.1:6001/api/auth/vk/callback"
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

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
        const user = await User.findById(payload._id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

    const vkStrategy = new VkTokenStrategy({
            clientID: VK_CLIENT_ID,
            clientSecret: VK_CLIENT_SECRET,
            callbackURL:  VK_REDIRECT_URL,
            profileFields: ['uid', 'first_name', 'last_name', 'screen_name', 'sex', 'photo', 'photo_200', 'bdate']
        },
        async function(accessToken, refreshToken, profile, next) {
            const user = await User.findOne({ vkId: profile._id });
            console.log(profile);
            if (!user) {
                const user = await new User({
                    vkId: profile._id,
                    name: profile.displayName,
                    login: profile.username,
                    avatar: profile._json.photo_200
                }).save();
                return next(null, user);
            } else {
                user.avatar = profile._json.photo_200;
                user.name = profile.displayName;
                await user.save();

                return next(null, user);
            }
        }
    );

    passport.use(jwtStrategy);
    passport.use(vkStrategy);
};

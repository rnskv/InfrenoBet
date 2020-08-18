import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

// const VKontakteStrategy = require('passport-vkontakte').Strategy;
import VkTokenStrategy from 'passport-vkontakte-token';
import SteamStrategy from 'passport-steam';

import config from 'src/config';
import User from 'src/models/User';
import { USER_NOT_FOUND } from 'shared/configs/notificationsTypes';

const {
    VK_CLIENT_ID,
    VK_CLIENT_SECRET,
    VK_REDIRECT_URL,
    STEAM_API_KEY,
    STEAM_REDIRECT_URL,
    STEAM_REALM,
} = process.env;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    session: true
};

const getUserFromReq = (req) => {
    const cookies = cookie.parse(req.header.cookie);
    if (!(cookies && cookies.token)) return null;
    const token = cookies.token.split(' ')[1];
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch(err) {
        return null
    }
};

export const usePassportStrategies = (passport) => {
    const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
        const user = await User.findById(payload._id);
        if (user) {
            done(null, user);
        } else {
            done({ type: USER_NOT_FOUND }, false);
        }
    });

    const vkStrategy = new VkTokenStrategy({
            clientID: VK_CLIENT_ID,
            clientSecret: VK_CLIENT_SECRET,
            callbackURL:  VK_REDIRECT_URL,
            apiVersion: '5.21',
            profileFields: ['uid', 'first_name', 'last_name', 'screen_name', 'sex', 'photo', 'photo_200', 'bdate']
        },
        async function(accessToken, refreshToken, profile, next) {
            if (!profile.id) {
                return next(null, false);
            }

            const user = await User.getByParams({ vkId: profile.id });

            if (!user) {
                const user = await User.create({
                    vkId: profile.id,
                    name: profile.displayName,
                    login: profile.username,
                    avatar: profile._json.photo_200
                });

                return next(null, user);
            } else {
                user.avatar = profile._json.photo_200;
                user.name = profile.displayName;
                await user.save();
                return next(null, user);
            }
        }
    );

    const steamStrategy = new SteamStrategy({
            returnURL: STEAM_REDIRECT_URL,
            realm: STEAM_REALM,
            apiKey: STEAM_API_KEY,
            passReqToCallback: true
        },
        async function(req, identifier, profile, next) {
            const userData = getUserFromReq(req);
            if (userData) {
                const alreadyExists = await User.getBySteamId(profile._json.steamid);
                if (alreadyExists) {
                    return next({ type: 'USER_ALREADY_EXIST' }, false);
                }
                const user = await User.findById(userData._id);
                user.steamId = profile._json.steamid;
                user.save();
                return next(null, user);
            } else {
                const {
                    steamid,
                    personaname,
                    avatarfull,
                    realname,
                } = profile._json;

                const alreadyExists = await User.getBySteamId(steamid);

                if (alreadyExists) {
                    return next(null, alreadyExists);
                }
                const user = await User.create({
                    steamId: steamid,
                    name: realname,
                    login: personaname,
                    avatar: avatarfull,
                });

                return next(null, user);
            }

        }
    );

    passport.use(steamStrategy);
    passport.use(jwtStrategy);
    passport.use(vkStrategy);
};

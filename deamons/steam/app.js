const mode = process.env.MODE;
console.log('BOT STARTED AT MODE:', mode);

const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const FS = require('fs');
const redis = require('redis');
const rp = require('request-promise');
const Steam = require('./Steam');
const config = require('./config')[mode];
const Api =  require('./core/Api');

const redisClient = redis.createClient({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
});

redisClient.auth('kjashdhqe!i321lDdasd');

const redisSub = redis.createClient({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
});

redisSub.auth('kjashdhqe!i321lDdasd');

const community = new SteamCommunity();
const client = new SteamUser();

const userActions = require('./actions/user');
const tradeOffersActions = require('./actions/tradeoffers');


const tradeOfferManager = new TradeOfferManager({
    "steam": client,
    "domain": config.domain,
    "language": "ru",
});

const api = new Api({
    rp,
    API_URL: config.API_URL
});

api.logIn({
    email: config.INFERNO_EMAIL,
    password: config.INFERNO_PASSWORD
}).then(() => {
    const bot1 = new Steam({
        config,
        tradeOfferManager,
        client,
        community,
        redis: redisClient,
        redisSub: redisSub,
        api
    });

    bot1.addActions('user', userActions);
    bot1.addActions('tradeoffers', tradeOffersActions);

    bot1.subscribes();
    bot1.logOn();
});
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const FS = require('fs');
const redis = require('redis');
const rp = require('request-promise');
const Steam = require('./Steam');
const config = require('./config');
const redisClient = redis.createClient({
    host: 'redis',
    port: 6379
});
const community = new SteamCommunity();
const client = new SteamUser();

const userActions = require('./actions/user');
const tradeOffersActions = require('./actions/tradeoffers');

const tradeOfferManager = new TradeOfferManager({
    "steam": client,
    "domain": config.domain,
    "language": "ru",
});

const bot1 = new Steam({
    config,
    tradeOfferManager,
    client,
    community,
    redis: redisClient,
    rp
});

bot1.addActions('user', userActions);
bot1.addActions('tradeoffers', tradeOffersActions);

bot1.subscribes();
bot1.logOn();

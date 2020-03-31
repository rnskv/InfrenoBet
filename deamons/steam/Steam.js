const SteamTotp = require('steam-totp');

class Steam {
    constructor({
        config,
        tradeOfferManager,
        client,
        community,
        redis,
        rp
    }) {
        this.rp = rp;
        this.config = config;
        this.tradeOfferManager = tradeOfferManager;
        this.client = client;
        this.community = community;
        this.redis = redis;
        this.types = {
            STATUS: {
                PENDING: 'pending'
            }
        };
        this.actions = {};
    }

    addActions(name, actions) {
        this.actions[name] = actions(this);
    }

    logOn(logOnOptions) {
        const { LOGIN, PASSWORD, SHARED_SECRET } = this.config;

        this.client.logOn({
            "accountName": LOGIN,
            "password": PASSWORD,
            "twoFactorCode": SteamTotp.getAuthCode(SHARED_SECRET)
        });
    }

    subscribes() {
        this.client.on('loggedOn', this.actions.user.onLogOn);
        this.client.on('webSession', this.actions.user.onWebSession);
        this.tradeOfferManager.on('newOffer', this.actions.tradeoffers.onNewTradeOffer);
        this.tradeOfferManager.on('sentOfferChanged', this.actions.tradeoffers.onSentOfferChanged);

        setTimeout(async () => {
            const inventory = await this.actions.user.getInventory({ gameId: 570 });
            console.log('Нашел предметы, кол-во:', inventory.length);
            this.actions.tradeoffers.sendOffer(inventory)
        }, 10000)
    }

}

module.exports = Steam;

const SteamTotp = require('steam-totp');
const Api = require('./core/Api');

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
        this.actions = {};
        this.types = {
            STATUS: {
                PENDING: 'pending'
            }
        };
        this.api = new Api({
            rp,
            API_URL: config.API_URL
        });
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

    getEItems(trade) {
        const EItems = [];

        for (const _item of trade.items) {
            EItems.push({
                appid: _item.parent.appId,
                assetid: _item.assetId,
                contextid: _item.contextId,
                amount: 1,
            });
        }

        return EItems
    }

    startWithdrawChecker() {
        setInterval(async () => {
            const tradeRequests = await this.api.sendRequest({
                url: `/api/tradeoffers`,
                body: {
                    params: {
                        status: 'CREATED'
                    }
                },
                onSuccess: () => console.log('Трейды на вывод получены.'),
                onError: () => console.log('Не удалось получить трейды на вывод')
            });

            if (!tradeRequests.length) {
                console.log('Трейдов на вывод нет');
                return;
            }

            for (const trade of tradeRequests) {
                await this.actions.tradeoffers.sendWithdrawOffer({ trade })
            }
        }, 10000)
    };

    async subscribes() {
        this.client.on('loggedOn', this.actions.user.onLogOn);
        this.client.on('webSession', this.actions.user.onWebSession);
        this.tradeOfferManager.on('newOffer', this.actions.tradeoffers.onNewTradeOffer);
        this.tradeOfferManager.on('sentOfferChanged', this.actions.tradeoffers.onSentOfferChanged);

        this.startWithdrawChecker();
    }

}

module.exports = Steam;

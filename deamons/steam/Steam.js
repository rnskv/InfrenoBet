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

    async subscribes() {
        this.client.on('loggedOn', this.actions.user.onLogOn);
        this.client.on('webSession', this.actions.user.onWebSession);
        this.tradeOfferManager.on('newOffer', this.actions.tradeoffers.onNewTradeOffer);
        this.tradeOfferManager.on('sentOfferChanged', this.actions.tradeoffers.onSentOfferChanged);

        setTimeout(async () => {
            // const inventory = await this.actions.user.getInventory({ gameId: 570 });
            const inventory = await this.actions.user.getInventory({ gameId: 570 });

            // const inventories = {};
            // this.actions.tradeoffers.sendOffer("https://steamcommunity.com/tradeoffer/new/?partner=879013079&token=EuZ8Ddih", inventory)

            const tradeRequests = await this.rp({
                uri: `${this.config.API_URL}/api/tradeoffers`,
                method: 'get',
                body: {
                    params: {
                        status: 'CREATED'
                    }
                },
                json: true
            });
            console.log(tradeRequests);
            for (const trade of tradeRequests) {
                console.log('Обнаружена заявка на вывод от', trade.user.steamId, 'кол-во предметов', trade.items.length);

                if (!trade.user.steamId) {
                    //отклоняем и закрываем трейд т.к не привязан профиль
                    console.log('отклоняем и закрываем трейд т.к не привязан профиль');
                }

                if (!trade.user.steamTradeUrl) {
                    //отклоняем и закрываем трейд т.к не привязана ссылка на обмен
                    console.log('Отклоняем и закрываем трейд т.к не привязана ссылка на обмен');
                    return;
                }

                const EItems = [];

                for (const _item of trade.items) {
                    EItems.push({
                        appid: _item.parent.appId,
                        assetid: _item.assetId,
                        contextid: _item.contextId,
                        amount: 1,
                    });
                    console.log(_item.parent._id);
                }

                try {
                    this.actions.tradeoffers.sendOffer(trade.user.steamTradeUrl, EItems)
                } catch (e) {
                    console.log('Ошибка при отправке трейда', e)
                }
            }
        }, 13000)
    }

}

module.exports = Steam;

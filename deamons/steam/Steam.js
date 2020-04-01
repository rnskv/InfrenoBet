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

            for (const trade of tradeRequests) {
                console.log('Обнаружена заявка на вывод от', trade.user.steamId, 'кол-во предметов', trade.items.length);
                if (!trade.user.steamId) {
                    console.log('отклоняем и закрываем трейд т.к не привязан профиль');
                    return;
                }

                if (!trade.user.steamTradeUrl) {
                    console.log('Отклоняем и закрываем трейд т.к не привязана ссылка на обмен');
                    return;
                }

                try {
                    console.log('sendOffer')
                    this.actions.tradeoffers.sendOffer({
                        steamTradeUrl: trade.user.steamTradeUrl,
                        items: this.getEItems(trade),
                        onError: ({ err, offer }) => {
                            console.log('Ошибка при отправке трейда', offer.id);
                            this.rp({
                                uri: `${this.config.API_URL}/api/tradeoffers`,
                                method: 'put',
                                body: {
                                    id: trade._id,
                                    data: {
                                        status: 'ERROR'
                                    }
                                },
                                json: true
                            });
                        },
                        onSuccess: (offer) => () => {
                            console.log('Трейд успешно отправлен', offer.id);

                            this.rp({
                                uri: `${this.config.API_URL}/api/tradeoffers`,
                                method: 'put',
                                body: {
                                    params: {
                                        id: trade._id,
                                        data: {
                                            status: 'SUCCESS'
                                        }
                                    }
                                },
                                json: true
                            });
                        }
                    })
                } catch (e) {
                    console.log('Ошибка при отправке трейда', e)
                }
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

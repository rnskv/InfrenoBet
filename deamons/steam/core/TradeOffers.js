const SteamID = require('steamid');

class TradeOffers {
    constructor({ root }) {
        this.root = root;

        this.validate = this.validate.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    static getSteamId(offer) {
        return SteamID.fromIndividualAccountID(offer.partner.accountid).toString();
    }

    async validate({steamId, offer}) {
        console.log('Валидируем трейд оффер');

        return await this.root.api.sendRequest({
            url: `/api/items/validate`,
            method: 'post',
            body: {
                offer,
                steamId,
            },
            onSuccess: () => console.log('Статус трейда успешно обновлен'),
            onError: () => console.log('Не удалось установить статус трейды')
        });
    }

    async send({
           steamTradeUrl,
           items = null,
           requestedItems = null,
           verificationCode,
           onSuccess,
           onError = () => console.log('Произошла ошибка при отправке трейда. Попробую позже')
       }) {
        console.log('Отправляем трейд оффер');
        const offer = this.root.tradeOfferManager.createOffer(steamTradeUrl);

        if (items) {
            offer.addMyItems(items);
            offer.setMessage("Ваши предметы с сайта INFERNOBET.RU");
        }

        if (requestedItems) {
            offer.addTheirItems(requestedItems);
            offer.setMessage(`Проверочный код #${verificationCode}. INFERNOBET.RU`);
        }

        offer.send((err, status) => {
            if (err) {
                onError({ err, offer});
                return;
            }

            this.confirm({ offer, status, onSuccess, onError });
        });
    }

    cancel({ offer, userId, type }) {
        console.log('Закрываем трейд оффер');

        offer.cancel(() => {
            this.root.redis.publish('user.notifications.add',
                JSON.stringify({
                    userId,
                    type,
                })
            );
        });
    }

    accept({ offer, onSuccess, onError }) {
        console.log('Принимаем трейд оффер');
        const steamId = SteamID.fromIndividualAccountID(offer.partner.accountid).toString();

        offer.accept(async (err, status) => {
            const { user } = this.validate({ steamId, offer });

            if (err) {
                console.log("Не получилось принять оффер: " + err.message);
                onError(err);
                return;
            }

            console.log("Оффер принят со статусом: " + status, offer);
            onSuccess(user, offer)
        });
    }

    confirm({ offer, onError, onSuccess }) {
        console.log('Подтверждаем трейд оффер');
        const { IDENTITY_SECRET } = this.root.config;

        if (status === root.types.STATUS.PENDING) {
            this.root.community.acceptConfirmationForObject(IDENTITY_SECRET, offer.id, (err) => {
                if (err) {
                    onError({ err, offer });
                    return;
                }
                onSuccess(offer);
            });
        }

        if (status === root.types.STATUS.SENT) {
            onSuccess(offer);
        }
    }

    moveItemsToUserInventory({ user, acceptedOffer }) {
        console.log('Перемещаем предметы в инвентарь пользователя');

        acceptedOffer.getReceivedItems(true, async (err, items) => {
            const { registeredItems } = await this.root.api.sendRequest({
                url: `/api/items/register`,
                method: 'post',
                body: {
                    items
                },
                onSuccess: () => console.log('Предметы успешно зарегистрированы на сервере'),
                onError: () => console.log('Не удалось зарегистрировать предметы')
            });

            const trade = { user, items: registeredItems };

            this.root.redis.publish('user.inventory.add', JSON.stringify(trade))
        });
    }
}

module.exports = TradeOffers;
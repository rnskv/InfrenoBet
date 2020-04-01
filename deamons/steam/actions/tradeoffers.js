const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = require('steamid');

module.exports = (root) => {
    const confirmTradeOffer = (offer, status) => {
        const { IDENTITY_SECRET } = root.config;
        if (status === root.types.STATUS.PENDING) {
            console.log("Оффер отправлен на подтверждение: " + status);
            root.community.acceptConfirmationForObject(IDENTITY_SECRET, offer.id, onAcceptTradeOffer(offer));
        }
    };

    const sendOffer = (steamTradeUrl, items) => {
        let offer = root.tradeOfferManager.createOffer(steamTradeUrl);

        offer.addMyItems(items);
        offer.setMessage("Вещи с сайта infernobet.ru");
        offer.send(function(err, status) {
            if (err) {
                console.log(err, status)
                return;
            }

            confirmTradeOffer(offer, status);
        });
    };

    const onAcceptTradeOffer = (offer) => (err) => {
        if (err) {
            console.log("Не удалось подтвердить SteamGuard: " + err.message);
        } else {
            console.log("Оффер " + offer.id + " подтвержден");
        }
    };

    const onNewTradeOffer = async (offer) => {
        // const sid = new SteamID(offer.partner.getSteam3RenderedID());
        const steamId = SteamID.fromIndividualAccountID(offer.partner.accountid).toString();

        console.log("Новый оффер #" + offer.id + " от пользователя " + steamId.toString());

        const { itemsToReceive, itemsToGive, id, appId } = offer;

        // if (itemsToGive.length > 0) {
        //     offer.decline();
        //     console.log('оффер отклонен по причине: пользователь запросил вещи');
        //     return;
        // }


        const validation = await root.rp({
            uri: `${root.config.API_URL}/api/items/validate`,
            method: 'post',
            body: {
                offer: offer,
                steamId,
            },
            json: true
        });

        console.log('Валидация:', validation.ok);

        if (!validation.ok) {
            offer.cancel(() => {
                console.log('Закрывает офер по причине:', validation.message);
            });
            return;
        }

        console.log('BEFORE', offer.getReceivedItems());

        offer.accept(async function(err, status) {
            const { user } = validation;

            if (err) {
                console.log("Не получилось принять оффер: " + err.message);
                return;
            }

            offer.getReceivedItems(true, async (err, items) => {
                console.log('AFTER', items);
                const { registeredItems } = await root.rp({
                    uri: `${root.config.API_URL}/api/items/register`,
                    method: 'post',
                    body: {
                        items
                    },
                    json: true
                });

                const trade = { user, items: registeredItems };

                root.redis.publish('user.inventory.add', JSON.stringify(trade))
            });

            console.log("Оффер принят со статусом: " + status, offer);
        });
    };

    const onSentOfferChanged = (offer, oldState) => {
        console.log(
            `Оффер #${offer.id} изменен: 
            ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`
        );
    };


  return {
      confirmTradeOffer,
      sendOffer,
      onAcceptTradeOffer,
      onNewTradeOffer,
      onSentOfferChanged
  }
};

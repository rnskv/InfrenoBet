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

    const sendOffer = (items) => {
        const partnerUrl = 'https://steamcommunity.com/tradeoffer/new/?partner=879013079&token=EuZ8Ddih';
        let offer = root.tradeOfferManager.createOffer(partnerUrl);

        offer.addMyItems(items);
        offer.setMessage("Here, have some items!");
        offer.send(function(err, status) {
            if (err) {
                console.log(err);
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

        offer.accept(async function(err, status) {
            const { items, user } = validation;
            if (err) {
                console.log("Не получилось принять оффер: " + err.message);
                return;
            }

            console.log("Оффер принят со статусом: " + status);

            console.log("Отправляю в редис ", items, user);

            const bet = { user, items };

            root.redis.rpush('game.roulette.bets', JSON.stringify(bet))
            // confirmTradeOffer(offer, status)
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

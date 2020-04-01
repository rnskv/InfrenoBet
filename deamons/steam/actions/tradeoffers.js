const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = require('steamid');

module.exports = (root) => {
    const addItemsToUserInventory = (user, acceptedOffer) => {
        acceptedOffer.getReceivedItems(true, async (err, items) => {
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
    };

    const confirmTradeOffer = (offer, status, onSuccess, onError) => {
        const { IDENTITY_SECRET } = root.config;
        if (status === root.types.STATUS.PENDING) {
            console.log("Оффер отправлен на подтверждение: " + status);
            root.community.acceptConfirmationForObject(IDENTITY_SECRET, offer.id, (err) => {
                if (err) {
                    onError({ err, offer });
                    return;
                }
                onAcceptTradeOffer(offer);
                onSuccess(offer);
            });
        }
    };

    const sendOffer = ({
       steamTradeUrl,
       items,
       onSuccess,
       onError = () => console.log('Произошла ошибка при отправке трейда. Попробую позже')
    }) => {
        const offer = root.tradeOfferManager.createOffer(steamTradeUrl);
        console.log('sendOffer2')

        offer.addMyItems(items);
        console.log('sendOffer3')

        offer.setMessage("Вещи с сайта infernobet.ru");
        console.log('sendOffer5')

        offer.send(function(err, status) {
            if (err) {
                console.log('sendOffer error')

                onError({ err, offer});
                return;
            }
            console.log('sendOffer4')

            confirmTradeOffer(offer, status, onSuccess, onError);
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
            const { user } = validation;

            if (err) {
                console.log("Не получилось принять оффер: " + err.message);
                return;
            }
            console.log("Оффер принят со статусом: " + status, offer);

            addItemsToUserInventory(user, offer)
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

const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamID = require('steamid');

module.exports = (root) => {
    const addItemsToUserInventory = (user, acceptedOffer) => {
        acceptedOffer.getReceivedItems(true, async (err, items) => {
            const { registeredItems } = await root.api.sendRequest({
                url: `/api/items/register`,
                method: 'post',
                body: {
                    items
                },
                onSuccess: () => console.log('Предметы успешно зарегистрированы на сервере'),
                onError: () => console.log('Не удалось зарегистрировать предметы')
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
        offer.addMyItems(items);
        offer.setMessage("Вещи с сайта infernobet.ru");

        offer.send(function(err, status) {
            if (err) {
                onError({ err, offer});
                return;
            }

            confirmTradeOffer(offer, status, onSuccess, onError);
        });
    };

    const onNewTradeOffer = async (offer) => {
        const steamId = SteamID.fromIndividualAccountID(offer.partner.accountid).toString();

        console.log("Новый оффер #" + offer.id + " от пользователя " + steamId.toString());

        const validation = await validateUserOffer({ steamId, offer });

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

    const setTradeofferStatus = async ({ id, status }) => {
        await root.api.sendRequest({
            url: `/api/tradeoffers`,
            method: 'put',
            body: {
                params: {
                    id,
                    data: {
                        status
                    }
                }
            },
            onSuccess: () => console.log('Статус трейда успешно обновлен'),
            onError: () => console.log('Не удалось установить статус трейды')
        });
    };

    const validateUserOffer = async ({ steamId, offer }) => {
        return await root.sendRequest({
            url: `/api/items/validate`,
            method: 'post',
            body: {
                offer: offer,
                steamId,
            },
            onSuccess: () => console.log('Статус трейда успешно обновлен'),
            onError: () => console.log('Не удалось установить статус трейды')
        });
    };

    const sendWithdrawOffer = async ({ trade }) => {
        console.log('Обнаружена заявка на вывод от', trade.user.steamId, 'кол-во предметов', trade.items.length);
        if (!trade.user.steamId) {
            console.log('отклоняем и закрываем трейд т.к не привязан профиль');
            await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
            return;
        }

        if (!trade.user.steamTradeUrl) {
            console.log('Отклоняем и закрываем трейд т.к не привязана ссылка на обмен');
            await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
            return;
        }

        try {
            sendOffer({
                steamTradeUrl: trade.user.steamTradeUrl,
                items: this.getEItems(trade),
                onError: async ({ err, offer }) => {
                    console.log('Ошибка при отправке трейда', offer.id);
                    await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
                },
                onSuccess: async (offer) => {
                    console.log('Трейд успешно отправлен', offer.id);
                    await setTradeofferStatus({ id: trade._id, status: 'SUCCESS'});
                }
            })
        } catch (e) {
            console.log('Ошибка при отправке трейда', e)
        }
    };

    return {
        confirmTradeOffer,
        sendOffer,
        onNewTradeOffer,
        onSentOfferChanged,
        sendWithdrawOffer
    }
};

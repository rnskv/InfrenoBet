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

        if (status === root.types.STATUS.SENT) {
            onSuccess(offer);
        }
    };

    const sendOffer = ({
       steamTradeUrl,
       items = null,
       requestedItems = null,
       onSuccess,
       verificationCode,
       onError = () => console.log('Произошла ошибка при отправке трейда. Попробую позже')
    }) => {
        const offer = root.tradeOfferManager.createOffer(steamTradeUrl);

        if (items) {
            offer.addMyItems(items);
            offer.setMessage("Ваши предметы с сайта INFERNOBET.RU");
        }
        if (requestedItems) {
            offer.addTheirItems(requestedItems);
            offer.setMessage(`Проверочный код #${verificationCode}. INFERNOBET.RU`);
        }

        offer.send(function(err, status) {
            if (err) {
                onError({ err, offer});
                return;
            }

            confirmTradeOffer(offer, status, onSuccess, onError);
        });
    };

    const onSentOfferChanged = async (offer, oldState) => {
        if (offer.itemsToReceive) {
            console.log('Это трейд')
        }

        if (offer.itemsToGive.length === 0 &&
            offer.itemsToReceive.length > 0 &&
            TradeOfferManager.ETradeOfferState[offer.state] === 'Accepted')
        {
            console.log(`Трейд ${offer.id} был отправлен на ввод предметов и принят пользователем`);
            const steamId = SteamID.fromIndividualAccountID(offer.partner.accountid).toString();
            const validation = await validateUserOffer({ steamId, offer });
            const { user } = validation;
            addItemsToUserInventory(user, offer)

        } else {
            console.log('Не удалось ввести предмет')
        }

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
                id,
                data: {
                    status
                },
                isNeedReturnItems: status === 'ERROR'
            },
            onSuccess: () => console.log('Статус трейда успешно обновлен'),
            onError: () => console.log('Не удалось установить статус трейды')
        });
    };

    const validateUserOffer = async ({ steamId, offer }) => {
        return await root.api.sendRequest({
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

    const sendDepositOffer = async ({ profile, items }) => {
        console.log('Формирую трейд на ввод предметов для', profile.steamId);
        try {
            const min = 1000;
            const max = 9999;

            const verificationCode = Math.floor(Math.random() * (max - min)) + min;

            sendOffer({
                steamTradeUrl: profile.steamTradeUrl,
                items: [],
                requestedItems: root.getEItems({
                    items
                }),
                verificationCode,
                onError: async ({ err, offer }) => {
                    console.log('Ошибка при отправке трейда', err);
                    root.redis.publish('user.notifications.add',
                        JSON.stringify({
                            userId: profile._id,
                            type: 'TRADEOFFER_SENT_ERROR',
                        }), (err) => {
                            console.log('Send message to redis', err)
                        }
                    );
                },
                onSuccess: async (offer) => {
                    console.log('Publish notification with verify code to redis');

                    root.redis.publish('user.notifications.add',
                        JSON.stringify({
                            userId: profile._id,
                            type: 'TRADEOFFER_VERIFY_CODE',
                            params: {
                                text: `Предложение обмена отправлено! Проверочный код: #${verificationCode}`,
                            }
                        })
                    );
                    console.log('Трейд успешно отправлен', offer.id);
                }
            })
        } catch (e) {
            console.log('Ошибка при отправке трейда', e)
        }
    };

    const sendWithdrawOffer = async ({ trade }) => {
        console.log('Обнаружена заявка на вывод от', trade.user.steamId, 'кол-во предметов', trade.items.length);
        if (!trade.user) {
            console.log('отклоняем и закрываем трейд т.к нет хозяина');
            await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
            return;
        }

        if (!trade.user.steamId) {
            console.log('отклоняем и закрываем трейд т.к не привязан профиль');
            root.redis.publish('user.notifications.add', JSON.stringify({ type: 'INTERNAL_SERVER_ERROR'}));

            await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
            return;
        }

        if (!trade.user.steamTradeUrl) {
            console.log('Отклоняем и закрываем трейд т.к не привязана ссылка на обмен');
            root.redis.publish('user.notifications.add', JSON.stringify({ type: 'INTERNAL_SERVER_ERROR'}));
            await setTradeofferStatus({ id: trade._id, status: 'ERROR'});
            return;
        }

        try {
            sendOffer({
                steamTradeUrl: trade.user.steamTradeUrl,
                items: root.getEItems(trade),
                onError: async ({ err, offer }) => {
                    console.log('Ошибка при отправке трейда', err);
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
        onSentOfferChanged,
        sendWithdrawOffer,
        sendDepositOffer
    }
};

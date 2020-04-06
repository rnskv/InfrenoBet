const TradeOffer = require('../core/TradeOffers');

module.exports = (root) => {
    const onSuccessAccept = ({ user, offer }) => () => {
        root.core.tradeoffers.moveItemsToUserInventory({user, acceptedOffer: offer});
    };

    const onErrorAccept = ({ user, offer }) => () => {
        console.log('Ошибка при принятии трейда');
    };

    return async (offer) => {
        console.log('Получен новый трейд оффер');
        const steamId = TradeOffer.getSteamId(offer);

        const validation = await root.core.tradeoffers.validate({ steamId, offer });

        const { user } = validation;

        if (!validation.ok) {
            const { type } = validation;
            console.log('Валидация', validation);
            root.core.tradeoffers.cancel({ offer, userId: user ? user._id : null, type });
            return;
        }

        root.core.tradeoffers.accept({ offer,
            onSuccess: onSuccessAccept({ user, offer}),
            onError: onErrorAccept({ user, offer}),
        });
    };
};
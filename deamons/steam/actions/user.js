module.exports = (root) => {
    const getInventory = ({ gameId }) => {
        return new Promise((resolve, reject) => {
            root.tradeOfferManager.getInventoryContents(gameId, 2, true, function(err, inventory) {
                if (err) {
                    reject(err);
                    return;
                }

                if (inventory.length === 0) {
                    // Inventory empty
                    console.log(`В ${gameId} нет вещей`);
                    return;
                }

                resolve(inventory);
            });
        })
    };

    const onLogOn = () => {
        console.log('Аутентификация пройдена');
    };

    const onWebSession = async  (sessionID, cookies) => {
        root.community.setCookies(cookies);
        root.tradeOfferManager.setCookies(cookies, async function(err) {
            if (err) {
                process.exit(1); // Fatal error since we couldn't get our API key
                return;
            }

            console.log("Получен апи кей: " + root.tradeOfferManager.apiKey);
        })
    };

    return {
        onLogOn,
        onWebSession,
        getInventory
    }
};

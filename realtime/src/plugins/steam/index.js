const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const SteamTotp = require('steam-totp');
const TradeOfferManager = require('steam-tradeoffer-manager');
const FS = require('fs');

const LOGIN = "bot1_inferno";
const PASSWORD = "MKaAtoOTpMEQ";
const SHARED_SECRET = "xiTzqF242TIuX9GtfaNUCw2aA1I=";
const DOMAIN = "infernobet.ru";
const IDENTITY_SECRET = "k8jgvHImiu73UkLjLi674sWdEUw=";

let client = new SteamUser();

let manager = new TradeOfferManager({
    "steam": client, // Polling every 30 seconds is fine since we get notifications from Steam
    "domain": DOMAIN, // Our domain is example.com
    "language": "ru" // We want English item descriptions
});

let community = new SteamCommunity();

console.log(SteamTotp.getAuthCode(SHARED_SECRET));
let logOnOptions = {
    "accountName": LOGIN,
    "password": PASSWORD,
    "twoFactorCode": SteamTotp.getAuthCode(SHARED_SECRET)
};

client.logOn(logOnOptions);

client.on('loggedOn', function() {
    console.log("Logged into Steam");
});

client.on('webSession', function(sessionID, cookies) {
    manager.setCookies(cookies, function(err) {
        if (err) {
            console.log('Oh lol', err, sessionID, cookies);
            process.exit(1); // Fatal error since we couldn't get our API key
            return;
        }

        console.log("Got API key: " + manager.apiKey);

        // Get our inventory
        manager.getInventoryContents(730, 2, true, function(err, inventory) {
            if (err) {
                console.log(err);
                return;
            }

            if (inventory.length == 0) {
                // Inventory empty
                console.log("CS:GO inventory is empty");
                return;
            }

            console.log("Found " + inventory.length + " CS:GO items");
        });
    });

    community.setCookies(cookies);
});


manager.on('newOffer', function(offer) {
    console.log("New offer #" + offer.id + " from " + offer.partner.getSteam3RenderedID());
    offer.accept(function(err, status) {
        if (err) {
            console.log("Unable to accept offer: " + err.message);
        } else {
            console.log("Offer accepted: " + status);
            if (status == "pending") {
                community.acceptConfirmationForObject(IDENTITY_SECRET, offer.id, function(err) {
                    if (err) {
                        console.log("Can't confirm trade offer: " + err.message);
                    } else {
                        console.log("Trade offer " + offer.id + " confirmed");
                    }
                });
            }
        }
    });
});

manager.on('sentOfferChanged', function(offer, oldState) {
    console.log(`Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`);
});

export default () => {
    console.log('steam');
}

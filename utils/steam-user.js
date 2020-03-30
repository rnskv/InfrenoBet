/**
 * SteamUser example - BasicBot
 *
 * Simply logs into Steam using account credentials, goes online on friends, and launches Team Fortress 2
 */

const SteamUser = require('steam-user'); // Replace this with `require('steam-user');` if used outside of the module directory
var client = new SteamUser();

client.logOn({
    "accountName": "bot1_inferno",
    "password": "MKaAtoOTpMEQ"
});

client.on('loggedOn', function(details) {
    console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
    client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed(440);
});

client.on('error', function(e) {
    console.log(e);
});

client.on('webSession', function(sessionID, cookies) {
    client.enableTwoFactor((err, response) => {
        console.log(err, response)
        client.finalizeTwoFactor('xiTzqF242TIuX9GtfaNUCw2aA1I=', '53277', (err) => {
            console.log(err)
        })
    });

});
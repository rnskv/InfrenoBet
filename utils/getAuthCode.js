const SteamTotp = require('steam-totp');
const SHARED_SECRET = "xiTzqF242TIuX9GtfaNUCw2aA1I=";

console.log(SteamTotp.getAuthCode(SHARED_SECRET));
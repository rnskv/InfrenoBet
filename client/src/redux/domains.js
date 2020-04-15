import userDomains from 'src/redux/user/domains';
import gameDomains from 'src/redux/game/domains';
import betMakerDomains from 'src/redux/betMaker/domains';
import cashierDomains from 'src/redux/cashier/domains';
import referralsDomains from 'src/redux/referrals/domains';

export default {
    user: userDomains,
    game: gameDomains,
    betMaker: betMakerDomains,
    cashier: cashierDomains,
    referrals: referralsDomains,
};

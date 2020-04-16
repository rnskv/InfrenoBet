import User from 'src/models/User';
import Referral from 'src/models/Referral';

export const connectWithPartner = async function ({ referralCode, user }) {
    if (referralCode) {
        const partner = await User.getByParams({ referralCode });

        if (partner) {
            console.log('Id партнера', partner._id);
            if (String(partner._id) === String(user._id)) {
                console.log('Нельзя использовать свйо же код');
                return;
            }

            const r = await Referral.create({
                partner: partner._id,
                user: user._id
            });

            if (r.ok === false) {
                console.log('Пользователь уже является рефералом');
            }
        } else {
            console.log('Пользователь регистрируется с кодом несуществующего партнера', referralCode);
        }
    }
}

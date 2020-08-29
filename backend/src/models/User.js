import mongoose from 'mongoose';
import privatePaths from 'mongoose-private-paths';
import Bet from './Bet';

const { Schema } = mongoose;
import { USER_NOT_ENOUGH_MONEY, USER_NOT_FOUND } from 'src/types/errors';
import TradeOffer from './TradeOffer';
import Experience from './Experience';
import { getAwardForLevel, getExperienceForLevel, getLevelIndexByExperience } from 'shared/helpers/levels';
import { USER_NOT_GET_NEEDED_LEVEL, USER_WRONG_AWARD_LEVEL, USER_ALREADY_GET_BONUS } from 'shared/configs/notificationsTypes';
import Award from './Award';

const userSchema = new Schema({
    vkId: {
      type: String,
      default: null,
    },
    steamId: {
      type: String,
      default: null,
    },
    login: {
        type: String,
        default: 'Player Unknown',
        required: true,
    },
    name: {
        type: String,
        default: 'Player Unknown'
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://sun9-37.userapi.com/c830400/v830400985/c0fdb/9CIryApwPMY.jpg?ava=1'
    },
    password: {
        type: String,
        private: true,
    },
    balance: {
        type: Number,
        default: 1,
    },
    inventory: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: 'inventoryItem'
    },
    steamTradeUrl: {
        type: String,
        default: null
    },
    experience: {
        type: Number,
        default: 0,
    },
    receivedAwards: {
        type: Number,
        default: 0,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    accessLevel: {
        type: Number,
        default: 1,
    },
    referralCode: {
        type: String,
        default: null,
    },
    referralShare: {
        type: Number,
        default: 0.1
    },
    takedBonusDate: {
        type: Date,
        default: 0,
    },
    createDate: {
        type: Date,
        default: () => Date.now(),
    }
});

userSchema.plugin(privatePaths);

const User = mongoose.model('user', userSchema);

User.checkReferralCode = async (referralCode) => {
    return Boolean(await User.findOne({ referralCode }));
};

User.getByParams = async (params) => {
    return await User.findOne(params)
        .populate({
            path: 'inventory',
            model: 'inventoryItem',
            populate: {
                path: 'parent',
                model: 'item',
            }
        })
};

User.create = async (data) => {
    const user = await new User(data);
    await user.save();
    return user;
};

User.getById = async (id) => {
    return await User.getByParams({ _id: id })
};

User.update = async (id, data) => {
    return User.updateOne({ _id: mongoose.Types.ObjectId(id)}, data)
};

User.getBySteamId = async (id) => {
    return await User.getByParams({ steamId: id })
};

User.addItemsToInventory = async (id, itemsIds) => {
    const user = await User.findById(id);

    user.inventory = [...user.inventory, ...itemsIds];
    try {
        user.save();
    } catch(error) {
        return false;
    }

    return true
};

User.removeItemsFromInventory = async (id, itemsIds) => {
    const user = await User.findById(id);

    for (const item of itemsIds) {
        const itemIndexInInventory = user.inventory.findIndex(i => {
            return i && i.toString() === item.toString()
        });

        console.log('Ищу в инвентаре', user.inventory);
        console.log('Ищу предмет', item);

        if (itemIndexInInventory !== -1) {
            console.log('Найден предмет в инвантаре', itemIndexInInventory);
            user.inventory.splice(itemIndexInInventory, 1);
        } else {
            console.log('Не найден предмет', itemIndexInInventory);
            return false;
        }
        console.log('Инвентарь после модификации', user.inventory);
        user.save();
    }

    return true;
};

User.addExperience = async ({ id, amount, type }) => {
    const user = await User.getById(id);

    if (!user) {
        throw USER_NOT_FOUND;
    }

    user.experience = Number(user.experience) + Number(amount);
    user.save();

    await Experience.create({
        user: id,
        amount,
        type,
    });

    return user
};

User.changeBalance = async (id, amount) => {
    const user = await User.getById(id);

    if (!user) {
        throw USER_NOT_FOUND;
    }

    if (Number(user.balance) + Number(amount) < 0) {
        throw USER_NOT_ENOUGH_MONEY;
    }

    user.balance = Number(user.balance) + Number(amount);
    user.save();

    return user
};

User.takeBonus = async (id) => {
    console.log('take bonus by ', id)
    const user = await User.getById(id);
    const now = Date.now();
    const requestTime = new Date(now).getTime();
    const lastTakedTime = new Date(user.takedBonusDate).getTime();
    if (!user) {
        throw USER_NOT_FOUND;
    }

    console.log('time left:', requestTime - lastTakedTime);

    await User.changeBalance(id, 1);

    if (requestTime - lastTakedTime < 60000) {
        throw USER_ALREADY_GET_BONUS;
    }

    user.takedBonusDate = now;
    await user.save();
}

User.checkUserInventoryItems = async (id, itemsIds) => {
    const user = await User.getById(id);

    for (const item of itemsIds) {
        if (!user.inventory.find(_item => _item._id.toString() === item.toString())) {
            return false;
        }
    }

    return true;
};

User.addAward = async ({ id, lvl }) => {
    const user = await User.getById(id);
    const { receivedAwards, experience } = user;
    console.log('id', id);
    const level = getLevelIndexByExperience(experience) + 1;
    const award = getAwardForLevel(lvl);
    const awardLevelExperience = getExperienceForLevel(lvl);

    if (lvl - 1 !== receivedAwards) {
        console.log('Награда за уровень', lvl);
        console.log('Получено наград', receivedAwards);
        throw USER_WRONG_AWARD_LEVEL;
    }

    if (awardLevelExperience > experience) {
        throw USER_NOT_GET_NEEDED_LEVEL;
    }

    user.receivedAwards = lvl;
    await user.save();
    await User.changeBalance(user._id, award);
    await Award.create({
        amount: award,
        source: 'LEVEL_UP',
        user: user._id,
    });

    return {
        ok: true
    }
};

export default User;

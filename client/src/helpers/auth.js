import Cookie from 'js-cookie';
import CorsPopup from 'src/helpers/CorsPopup';
import { logInProccesing } from 'src/helpers/system';
import { infernoClient } from 'src/index';

const { VK_CLIENT_ID, VK_REDIRECT_URL, STEAM_AUTH_URL } = process.env;

export function openAuthVkWindow() {
    const vkUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=6&response_type=code&v=5.103`;
    const authPopup = new CorsPopup({
        url: vkUrl,
        checkMethod: () => Cookie.get('isLinkVk'),
        params: `width=800,height=400, top=${((screen.height - 400) / 2)},left=+${((screen.width - 800) / 2)}`,
        features: ['resizable=yes, scrollbars=no, status=yes'],
        target: '_blank',
        onClose: () => {
            logInProccesing({ app: infernoClient });
        },
    });

    authPopup.open();
}

export function openAuthSteamWindow() {
    const authPopup = new CorsPopup({
        url: STEAM_AUTH_URL,
        checkMethod: () => Cookie.get('isLinkSteam'),
        params: `width=800,height=400, top=${((screen.height - 400) / 2)},left=+${((screen.width - 800) / 2)}`,
        features: ['resizable=yes, scrollbars=no, status=yes'],
        target: '_blank',
        onClose: () => {
            logInProccesing({ app: infernoClient });
        },
    });

    authPopup.open();
}

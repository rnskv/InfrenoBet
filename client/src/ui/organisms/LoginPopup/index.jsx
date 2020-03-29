import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import InlineSVG from 'svg-inline-react';
import { infernoClient } from 'src/index';
import { useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';
import { useHistory } from 'react-router-dom';

import Popup from 'ui/molecules/Popup';
import VerifyAge from 'ui/molecules/VerifyAge';

import emailIconSvg from 'src/resources/svg/mail-icon.svg';
import vkIconSvg from 'src/resources/svg/vkontakte-icon.svg';

import CorsPopup from 'src/helpers/CorsPopup';

import { openLoginPopup, closeLoginPopup } from 'src/redux/user/actions';


import {
    MethodSelection,
    Container,
    Title,
    Method,
    MethodIcon,
} from './styled';
import { logInProccesing } from 'src/helpers/system';

const { VK_CLIENT_ID, VK_REDIRECT_URL } = process.env;

function openAuthWindow() {
    const vkUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=6&response_type=code&v=5.103`;
    const authPopup = new CorsPopup({
        url: vkUrl,
        finalPath: '/close',
        params: `width=800,height=400, top=${((screen.height - 400) / 2)},left=+${((screen.width - 800) / 2)}`,
        features: ['resizable=yes, scrollbars=no, status=yes'],
        target: '_blank',
        onClose: () => {
            logInProccesing({ app: infernoClient });
        },
    });

    authPopup.open();
}

const action = ({ type, history, callback }) => () => {
    switch (type) {
    case 'email': {
        history.push('/login');
        break;
    }

    case 'vk': {
        openAuthWindow();
        break;
    }

    default: {
        break;
    }
    }
    callback();
};

function LoginPopup({ className, style, children }) {
    const isVisible = useSelector((state) => state.user.isOpenedLoginPopup);
    const actions = useActions({ openLoginPopup, closeLoginPopup });
    const history = useHistory();

    const [isVerifiedAge, setIsVerifiedAge] = useState(false);

    const onCheckBoxChange = (e) => {
        setIsVerifiedAge(e.target.checked);
    };

    return (
        <Popup isVisible={isVisible} close={actions.closeLoginPopup}>
            <Container>
                <Title>
                    Выберите удобный способ входа:
                </Title>
                <MethodSelection>
                    <Method
                        isActive={isVerifiedAge}
                        type="vk"
                        onClick={
                            action({
                                type: 'vk',
                                history,
                                callback: actions.closeLoginPopup,
                            })
                        }
                    >
                        <MethodIcon>
                            <InlineSVG src={vkIconSvg} />
                        </MethodIcon>
                        <span>Вконтакте</span>
                    </Method>
                    <Method
                        isActive={isVerifiedAge}
                        type="email"
                        onClick={
                            action({ type: 'email', history, callback: actions.closeLoginPopup })
                        }
                    >
                        <MethodIcon>
                            <MethodIcon>
                                <InlineSVG src={emailIconSvg} />
                            </MethodIcon>
                        </MethodIcon>
                        <span>E-mail</span>
                    </Method>
                </MethodSelection>
                <VerifyAge
                    onChange={onCheckBoxChange}
                    isVerified={isVerifiedAge}
                />
            </Container>
        </Popup>
    );
}

LoginPopup.propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
};

LoginPopup.defaultProps = {
    isVisible: false,
};

export default LoginPopup;

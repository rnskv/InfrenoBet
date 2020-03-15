import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';
import { useHistory } from 'react-router-dom';

import Popup from 'ui/molecules/Popup';
import { openLoginPopup, closeLoginPopup } from 'src/redux/user/actions';

import Link from 'ui/atoms/Link';

import {
    MethodSelection,
    Container,
    Title,
    Method,
    AgeConfirm,
    MethodIcon,
} from './styled';

const { VK_CLIENT_ID, VK_REDIRECT_URL } = process.env;

function openAuthWindow() {
    const authWindow = window.open(
        `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=friends&response_type=code&v=5.103`,
        '_blank',
        ['width=500', 'height=250'],
    );

    authWindow.onunload = () => window.location.replace('/game/lottery');
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

    return (
        <Popup isVisible={isVisible} close={actions.closeLoginPopup}>
            <Container>
                <Title>Выберите удобный способ входа:</Title>
                <MethodSelection>
                    <Method
                        type="vk"
                        onClick={
                            action({ type: 'vk', history, callback: actions.closeLoginPopup })
                        }
                    >
                        <MethodIcon>
                            VK
                        </MethodIcon>
                        <span>Вконтакте</span>
                    </Method>
                    <Method
                        type="email"
                        onClick={
                            action({ type: 'email', history, callback: actions.closeLoginPopup })
                        }
                    >
                        <MethodIcon>
                            MAIL
                        </MethodIcon>
                        <span>E-mail</span>
                    </Method>
                </MethodSelection>
                <AgeConfirm>
                    Мне 18 и я ознакомился с правилами и условиями. Так же...
                </AgeConfirm>
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

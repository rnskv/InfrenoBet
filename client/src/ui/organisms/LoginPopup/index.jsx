import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';
import { useHistory } from 'react-router-dom';
import InlineSVG from 'svg-inline-react';

import Popup from 'ui/molecules/Popup';
import VerifyAge from 'ui/molecules/VerifyAge';
// import Checkbox from 'ui/atoms/Checkbox';
import emailIconSvg from 'src/resources/svg/mail-icon.svg';
import vkIconSvg from 'src/resources/svg/vkontakte-icon.svg';
import { infernoClient } from 'src/index.jsx';

import { openLoginPopup, closeLoginPopup, getProfile } from 'src/redux/user/actions';

import Link from 'ui/atoms/Link';

import {
    MethodSelection,
    Container,
    Title,
    Method,
    MethodIcon,
} from './styled';

const { VK_CLIENT_ID, VK_REDIRECT_URL } = process.env;

class CorsPopup {
    constructor({
        url, finalPath, features, params, target, onClose,
    }) {
        this._url = url;
        this._finalPath = finalPath;
        this._target = target;
        this._features = features;
        this._params = params;
        this._onClose = onClose;
        this._window = null;

        this.check = this.check.bind(this);
    }

    open() {
        this._window = window.open(
            this._url,
            this._target,
            this._params,
            this._features,
        );

        setTimeout(this.check, 1000);
    }

    close() {
        this._onClose();
        console.log('ПЕРЕЗАГРУЖАЙ');
        this._window.close();
    }

    check() {
        if (!this._window.closed) {
            if (this._window.location.pathname === this._finalPath) {
                this.close();
                return true;
            }
            setTimeout(this.check, 1000);
        }

        return false;
    }
}

function openAuthWindow() {
    const vkUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=6&response_type=code&v=5.103`;
    const authPopup = new CorsPopup({
        url: vkUrl,
        finalPath: '/close',
        params: `width=800,height=400, top=${((screen.height - 400) / 2)},left=+${((screen.width - 800) / 2)}`,
        features: ['resizable=yes, scrollbars=no, status=yes'],
        target: '_blank',
        onClose: () => window.location.reload(),
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

import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Cookie from 'js-cookie';
import InlineSVG from 'svg-inline-react';
import { infernoClient } from 'src/index';
import { useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';
import { useHistory } from 'react-router-dom';

import Popup from 'ui/molecules/Popup';
import VerifyAge from 'ui/molecules/VerifyAge';

import emailIconSvg from 'src/resources/svg/mail-icon.svg';
import vkIconSvg from 'src/resources/svg/vkontakte-icon.svg';
import steamIconSvg from 'src/resources/svg/steam.svg';

import { openLoginPopup, closeLoginPopup } from 'src/redux/user/actions';
import { openAuthSteamWindow, openAuthVkWindow } from 'src/helpers/auth';

import {
    MethodSelection,
    Container,
    Title,
    Method,
    MethodIcon,
} from './styled';


const action = ({ type, history, callback }) => () => {
    switch (type) {
    case 'email': {
        history.push('/login');
        break;
    }

    case 'vk': {
        openAuthVkWindow();
        break;
    }

    case 'steam': {
        openAuthSteamWindow();
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
                        type="steam"
                        onClick={
                            action({
                                type: 'steam',
                                history,
                                callback: actions.closeLoginPopup,
                            })
                        }
                    >
                        <MethodIcon>
                            <InlineSVG src={steamIconSvg} />
                        </MethodIcon>
                        <span>Steam</span>
                    </Method>
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

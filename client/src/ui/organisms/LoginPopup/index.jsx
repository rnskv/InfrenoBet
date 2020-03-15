import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'src/helpers/hooks';
import { useHistory } from 'react-router-dom';
import InlineSVG from 'svg-inline-react';

import Popup from 'ui/molecules/Popup';

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
    AgeConfirm,
    MethodIcon,
    StyledCheckbox,
} from './styled';

const { VK_CLIENT_ID, VK_REDIRECT_URL } = process.env;

function openAuthWindow() {
    window.open(
        `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URL}&scope=6&response_type=code&v=5.103`,
        '_blank',
        ['resizable=yes, scrollbars=no, status=yes'],
    );
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
                            <InlineSVG src={vkIconSvg}/>
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
                                <InlineSVG src={emailIconSvg}/>
                            </MethodIcon>
                        </MethodIcon>
                        <span>E-mail</span>
                    </Method>
                </MethodSelection>
                <AgeConfirm>
                    <StyledCheckbox
                        onChange={onCheckBoxChange}
                        checked={isVerifiedAge}
                    />
                    {`Мне уже исполнилось 18 лет, а так же я ознакомился с `}
                    <a>правилами и условиями</a>
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

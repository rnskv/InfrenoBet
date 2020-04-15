import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';

import { useProfile } from 'src/redux/user/hooks/selectors';
import { useNotificationActions } from 'src/redux/user/hooks/actions';
import {
    INTERNAL_SERVER_ERROR, REFERRAL_CODE_COPY_SUCCESS,
    REFERRAL_COPY_ERROR,
    REFERRAL_LINK_COPY_SUCCESS,
} from 'shared/configs/notificationsTypes';
import {
    Container,
    ReferralLink,
} from './styled';


function ReferralForm({}) {
    const notificationsActions = useNotificationActions();
    const profile = useProfile();
    const location = useLocation();

    const link = `${window.location.origin}?r=${profile.referralCode}`;

    const copy = (value, type) => {
        window.navigator.clipboard.writeText(value)
            .then(() => {
                // Получилось!
                notificationsActions.addNotification({ type });
            })
            .catch(() => {
                notificationsActions.addNotification({ type: REFERRAL_COPY_ERROR });
            });
    };

    const copyLink = () => {
        copy(link, REFERRAL_LINK_COPY_SUCCESS);
    };

    const copyCode = () => {
        copy(profile.referralCode, REFERRAL_CODE_COPY_SUCCESS);
    };

    return (
        <Container>
            <ReferralLink>
                <Input
                    label="ТВОЯ ПАРТНЁРСКАЯ ССЫЛКА"
                    value={link}
                    after={<Button onClick={copyLink}>Скопировать</Button>}
                />
                <p>
                    Когда кто-то переходит по вашей ссылке и регистрируется,
                    он становится рефералом, так же, как если бы он ввёл ваш код.
                </p>
            </ReferralLink>
            <ReferralLink>
                <Input
                    label="ВАШ КОД"
                    value={profile.referralCode}
                    after={<Button onClick={copyCode}>Скопировать</Button>}
                />
                <p>
                    Каждый раз, когда кто-то вводит ваш код - он становится вашим рефералом.
                </p>
            </ReferralLink>
        </Container>

    );
}

ReferralForm.propTypes = {

};

ReferralForm.defaultProps = {

};

export default ReferralForm;

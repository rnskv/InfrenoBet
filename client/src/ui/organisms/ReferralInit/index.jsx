import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import moment from 'moment';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Link from 'ui/atoms/Link';
import Svg from 'svg-inline-react';
import Title from 'ui/atoms/Title';
import { useProfile } from 'src/redux/user/hooks/selectors';
import { useReferralsActions, useReferralsDomains } from 'src/redux/referrals/hooks/actions';
import { useReferralsLoaders } from 'src/redux/referrals/hooks/selectors';
import {
    Container,
    ReferralLink,
} from './styled';


function ReferralInit({ isVisible }) {
    const profile = useProfile();
    const domains = useReferralsDomains();
    const loaders = useReferralsLoaders();
    const inputRef = useRef(null);
    const clickHandler = () => {
        domains.createCode({ code: inputRef.current.value });
    };

    if (!isVisible) return <></>;

    return (
        <Container>
            <Title>
                Партнёрская программа INFERNO
                <span>BET</span>
                .RU
            </Title>
            <p>
                Для получения доступа - создай собственный реферальный код
            </p>
            <div>
                <Input
                    ref={inputRef}
                    label="Реферальный код:"
                    value={profile.referralCode}
                    after={(
                        <Button
                            isLoading={loaders.cashOutIsLoading}
                            onClick={clickHandler}
                        >
                            Сохранить
                        </Button>
                    )}
                />
            </div>
            <p>
                Вы будете получать
                <span>от 10%</span>
                от суммы комиссии сайта с каждого выигрыша игрока,
                зарегистрированного по вашей
                партнерской ссылке
                , а так же игроков, которые активировали ваш
                реферальный код в момент регистрации. Персональная статистика станет доступна после создания реферального кода.
            </p>
        </Container>

    );
}

ReferralInit.propTypes = {
    isVisible: PropTypes.bool,
};

ReferralInit.defaultProps = {
    isVisible: false,
};

export default ReferralInit;

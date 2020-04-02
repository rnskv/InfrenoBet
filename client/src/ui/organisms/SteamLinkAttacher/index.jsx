import PropTypes from 'prop-types';

import React from 'react';
import { useActions } from 'src/helpers/hooks';
import { openLoginPopup } from 'src/redux/user/actions';
import SettingSvg from 'src/resources/svg/settings.svg';
import Svg from 'svg-inline-react';
import Button from 'ui/atoms/Button';
import Link from 'ui/atoms/Link';

import {
    Container,
    LogInButton,
    Title,
} from './styled';

function SteamLinkAttacher({ isVisible }) {
    if (!isVisible) return <></>;

    return (
        <Container>
            <Svg src={SettingSvg} />
            <p>
                Для ставок предметами STEAM вам необходимо прикрепить ваш STEAM аккаунт к профилю INFERNO.BET. И добавить трейд-ссылку в настройках профиля
            </p>

            <Link to={'/settings'}>
                <Button>
                    Прикрепить ссылку
                </Button>
            </Link>
        </Container>
    );
}

SteamLinkAttacher.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default SteamLinkAttacher;

import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import Svg from 'svg-inline-react';
import settingsSvg from 'src/resources/svg/settings.svg';
import supportSvg from 'src/resources/svg/support.svg';
import classicLogoSvg from 'src/resources/svg/classic-logo.svg';
import withdrawSvg from 'src/resources/svg/withdraw.svg';
import partnersSvg from 'src/resources/svg/partners.svg';
import moneySvg from 'src/resources/svg/money.svg';
import keySvg from 'src/resources/svg/key.svg';
import levelsSvg from 'src/resources/svg/levels.svg';
import questionSvg from 'src/resources/svg/question.svg';

import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { StateContext } from 'ui/organisms/Sidebar';
import NavigationLink from './Link';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    NavigationContainer,
    ItemsGroupFree,
    NavigationList,
    NavigationTitle,
    ItemsGroupPVP,
    ItemsGroupSystem,
} from './styled';
import { useProfile } from 'src/redux/user/hooks/selectors';

const GROUPS = [
    {
        id: 0,
        WRAPPER: ItemsGroupPVP,
        items: [
            {
                id: 0,
                to: '/game/lottery',
                svg: classicLogoSvg,
                text: 'Рулетка',
                description: 'Играй и побеждай!',
                onlyGuest: false,
                accessLevel: 0,
            },
            {
                id: 1,
                to: '/game/top_players',
                svg: classicLogoSvg,
                text: 'Топ игроков',
                description: 'Элитка подъехала',
                onlyGuest: false,
                accessLevel: 0,
            },
        ],
    },

    {
        id: 1,
        WRAPPER: ItemsGroupFree,
        items: [
            {
                id: 1,
                to: '/deposit',
                svg: moneySvg,
                text: 'Пополнение',
                description: 'Пополни счет или добавь скины в инвентарь!',
                accessLevel: 0,
            },
            {
                id: 2,
                to: '/withdraw',
                svg: withdrawSvg,
                text: 'Вывод',
                description: 'Забери свой выигрыш!',
                accessLevel: 0,
            },
            {
                id: 0,
                to: '/account/partner',
                svg: partnersSvg,
                text: 'Партнерка',
                description: 'Получай диведенды с выигрышей рефералов!',
                accessLevel: 1,
            },
            {
                id: 3,
                to: '/account/levels',
                svg: levelsSvg,
                text: 'Уровни',
                description: 'Повышай уровень - получай награду!',
                accessLevel: 1,
            },
        ],
    },

    {
        id: 2,
        WRAPPER: ItemsGroupSystem,
        items: [
            {
                id: 0,
                to: '/logup',
                svg: keySvg,
                text: 'Регистрация',
                description: 'Создай новый профиль!',
                accessLevel: -1,
            },
            {
                id: 1,
                to: '/account/settings',
                svg: settingsSvg,
                text: 'Настройки',
                description: 'Управляй аккаунтом!',
                accessLevel: 1,
            },
            {
                id: 2,
                to: '/admin/statistics',
                svg: settingsSvg,
                text: 'Статистика',
                description: 'Общая информация!',
                accessLevel: 100,
            },
            {
                id: 3,
                to: '/admin/system',
                svg: settingsSvg,
                text: 'Системное',
                description: 'Системные функции!',
                accessLevel: 100,
            },
            {
                id: 4,
                to: '/admin/withdraws',
                svg: settingsSvg,
                text: 'Выводы',
                description: 'Выводы нала пользователям!',
                accessLevel: 100,
            },
            {
                id: 5,
                to: '/faq',
                svg: questionSvg,
                text: 'FAQ',
                description: 'Ответы на вопросы.',
                accessLevel: 0,
            },
        ],
    },
];

const state = {
    isOpened: true,
};

function Navigation({ token }) {
    const [isOpened, setIsOpened] = useState(state.isOpened);
    const profile = useProfile();

    useEffect(() => {
        state.isOpened = isOpened;
    });

    const location = useLocation();

    const sidebarState = useContext(StateContext);
    return (
        <NavigationList>
            {GROUPS.map(group => (
                <group.WRAPPER key={group.id} isOpened={sidebarState.isOpened}>
                    {group.items.map(item => (
                        <NavigationLink
                            key={item.id}
                            {...item}
                            isOpened={sidebarState.isOpened}
                            isActive={location.pathname.indexOf(item.to) !== -1}
                            isVisible={
                                token
                                    ? item.accessLevel > -1 &&
                                      item.accessLevel < profile.accessLevel // replace from token
                                    : item.accessLevel >= -1 &&
                                      item.accessLevel <= 0
                            }
                        />
                    ))}
                </group.WRAPPER>
            ))}
        </NavigationList>
    );
}

Navigation.propTypes = {
    token: PropTypes.string.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

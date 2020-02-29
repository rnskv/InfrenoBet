import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { StateContext } from 'ui/organisms/Sidebar';
import NavigationLink from './Link';

import { mapDispatchToProps, mapStateToProps } from './connect';

import {
    NavigationContainer,
    NavigationList,
    NavigationTitle,
    ItemsGroupPVP,
    ItemsGroupSystem,
} from './styled';

const GROUPS = [
    {
        id: 0,
        WRAPPER: ItemsGroupPVP,
        items: [
            {
                id: 0,
                to: '/',
                svgId: 'classic-logo',
                text: 'Рулетка',
                description: 'Играй и побеждай!',
                onlyGuest: false,
                accessLevel: 0,
            },
        ],
    },
    {
        id: 1,
        WRAPPER: ItemsGroupSystem,
        items: [
            {
                id: 0,
                to: '/login',
                svgId: 'settings-icon',
                text: 'Авторизация',
                description: 'Войди в игру!',
                accessLevel: -1,
            },
            {
                id: 1,
                to: '/logup',
                svgId: 'settings-icon',
                text: 'Регистрация',
                description: 'Создай новый профиль!',
                accessLevel: 0,
            },
            {
                id: 1,
                to: '/login',
                svgId: 'tech-support-icon',
                text: 'Поддержка',
                description: 'Возникли проблемы?',
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

    useEffect(() => {
        state.isOpened = isOpened;
    });

    const location = useLocation();

    const sidebarState = useContext(StateContext);

    return (
        <NavigationList>
            {
                GROUPS.map((group) => (
                    <group.WRAPPER key={group.id} isOpened={sidebarState.isOpened}>
                        {
                            group.items.map((item) => (
                                <NavigationLink
                                    key={item.id}
                                    {...item}
                                    isOpened={sidebarState.isOpened}
                                    isActive={item.to === location.pathname}
                                    isVisible={
                                        token
                                            ? item.accessLevel > -1 && item.accessLevel < 666 // replace from token
                                            : item.accessLevel >= -1 && item.accessLevel <= 0
                                    }
                                />
                            ))
                        }
                    </group.WRAPPER>
                ))
            }
        </NavigationList>
    );
}

Navigation.propTypes = {
    token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

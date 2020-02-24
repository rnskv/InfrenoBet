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
                iconSrc: 'https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1',
                svgId: 'classic-logo',
                text: 'Classic',
                description: 'You lose all money',
                onlyGuest: false,
                accessLevel: 0,
            }
        ],
    },
    {
        id: 1,
        WRAPPER: ItemsGroupSystem,
        items: [
            {
                id: 0,
                to: '/login',
                iconSrc: 'https://sun9-37.userapi.com/c830400/v830400985/c0fdb/9CIryApwPMY.jpg?ava=1',
                text: 'Log In',
                description: 'You really ready?',
                accessLevel: 0,
            },
            {
                id: 1,
                to: '/logup',
                iconSrc: 'https://sun9-70.userapi.com/c851232/v851232275/1a81ed/u3H5ShX-82Q.jpg?ava=1',
                text: 'Log Up',
                description: 'Last chance go back',
                accessLevel: 0,
            }
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

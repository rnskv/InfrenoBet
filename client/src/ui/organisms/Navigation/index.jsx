import PropTypes from 'prop-types';

import React, { useState } from 'react';

import {
    Link,
} from 'react-router-dom';

import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Title from 'ui/atoms/Title';

import {
    NavigationContainer,
    NavigationList,
    NavigationTitle,
    ItemsGroupPVP,
    ItemsGroupSystem,
    NavigationItem,
    NavigationIcon,
    NavigationName,
    NavigationText,
    NavigationDescription,
} from './styled';

import NavigationLink from './Link';

function Navigation() {
    const [isOpened, setIsOpened] = useState(true);

    const GROUPS = [
        {
            id: 0,
            WRAPPER: ItemsGroupPVP,
            items: [
                {
                    id: 0,
                    to: '/',
                    iconSrc: 'https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1',
                    text: 'Classic',
                    description: 'You lose all money',
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
                    iconSrc: 'https://sun9-37.userapi.com/c830400/v830400985/c0fdb/9CIryApwPMY.jpg?ava=1',
                    text: 'Log In',
                    description: 'You really ready?',
                },
            ],
        }
    ];

    return (
        <NavigationContainer isOpened={isOpened}>
            <NavigationList>
                <NavigationTitle onClick={() => setIsOpened(!isOpened)}> WTF? </NavigationTitle>
                {
                    GROUPS.map((group) => (
                        <group.WRAPPER key = {group.id}>
                            {
                                group.items.map((item) => (
                                    <NavigationLink
                                        key = {item.id}
                                        {...item}
                                        isOpened={isOpened}
                                    />
                                ))
                            }
                        </group.WRAPPER>
                    ))
                }
            </NavigationList>
        </NavigationContainer>
    );
}

Navigation.propTypes = {
};

export default Navigation;

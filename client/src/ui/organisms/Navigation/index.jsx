import PropTypes from 'prop-types';

import React, { useRef } from 'react';

import {
    Link,
} from 'react-router-dom';

import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import Title from 'ui/atoms/Title';

const NavigationTitle = styled(Title)`
    color: var(--color-grey);
    font-size: 18px;
    text-align: center;
    background-color: var(--color-grey-400);
    padding: 10px;
    cursor: pointer;
    transition: .3s;
    
    &:hover {
        color: var(--color-white);
    }
`;
const NavigationIcon = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;

const NavigationText = styled.div`
    transition: .3s;
    font-size: 20px;
    color: var(--color-white);
    text-decoration: none;
    font-weight: 700;
`;

const NavigationDescription = styled.div`
    color: var(--color-grey);
    font-size: 14px;
    text-decoration: none !important;
`;

const NavigationName = styled.div`
    margin-left: 20px;
`;

const NavigationContainer = styled.div`
    width: 300px;
    height: calc(100vh - 50px);
    background: var(--color-grey-500);
    box-sizing: border-box;
`;

const NavigationList = styled.ul`
    margin: 0;
    padding: 0;
    
    a {
        text-decoration: none;
    }
`;

const ItemsGroupPVP = styled.div`
    border-left: 30px solid var(--color-violet);
    position: relative;
    &::after {
        content: 'PVP';
        position: absolute;
        left: -26px;
        top: 50%;
        color: var(--color-white);
        transform-origin: 0 0;
        transform: rotate(-90deg) translate(-50%, 2px);
    }
`;

const ItemsGroupSystem = styled.div`
    border-left: 30px solid var(--color-greyblue);
    position: relative;
    &::after {
        content: 'SYSTEM';
        position: absolute;
        left: -26px;
        top: 50%;
        color: var(--color-white);
        transform-origin: 0 0;
        transform: rotate(-90deg) translate(-50%, 2px);
    }
`;

const NavigationItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 25px;
    border-bottom: 1px solid var(--color-grey-400);
    cursor: pointer;
    
    &:hover {
        ${NavigationText} {
            color: var(--color-yellow); 
        } 
    }
`;

function Navigation() {
    return (
        <NavigationContainer>
            <NavigationList>
                <NavigationTitle> What the fuck? </NavigationTitle>
                <ItemsGroupPVP>
                    <Link to="/">
                        <NavigationItem>
                            <NavigationIcon src="https://sun9-12.userapi.com/c206516/v206516687/49d7a/c7wnfazUB98.jpg?ava=1" />
                            <NavigationName>
                                <NavigationText>
                                    Main
                                </NavigationText>
                                <NavigationDescription>
                                    Welcome home
                                </NavigationDescription>
                            </NavigationName>
                        </NavigationItem>
                    </Link>
                </ItemsGroupPVP>
                <ItemsGroupSystem>
                    <Link to="/login">
                        <NavigationItem>
                            <NavigationIcon src="https://sun9-37.userapi.com/c830400/v830400985/c0fdb/9CIryApwPMY.jpg?ava=1" />
                            <NavigationName>
                                <NavigationText>
                                    Login
                                </NavigationText>
                                <NavigationDescription>
                                    Go to auth
                                </NavigationDescription>
                            </NavigationName>
                        </NavigationItem>
                    </Link>

                    <Link to="/register">
                        <NavigationItem>
                            <NavigationIcon src="https://sun9-18.userapi.com/c855436/v855436451/13e812/7UJN6TT9F8k.jpg?ava=1" />
                            <NavigationName>
                                <NavigationText>
                                    Register
                                </NavigationText>
                                <NavigationDescription>
                                    Go to reg mfucka
                                </NavigationDescription>
                            </NavigationName>
                        </NavigationItem>
                    </Link>
                </ItemsGroupSystem>
            </NavigationList>
        </NavigationContainer>
    );
}

Navigation.propTypes = {
};

export default Navigation;

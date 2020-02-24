import Title from 'ui/atoms/Title';
import styled from 'styled-components';

export const NavigationTitle = styled(Title)`
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

export const NavigationIcon = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;

export const NavigationText = styled.div`
    transition: .3s;
    font-size: 20px;
    color: var(--color-white);
    text-decoration: none;
    font-weight: 700;
    min-width: 150px;
`;

export const NavigationDescription = styled.div`
    color: var(--color-grey);
    font-size: 14px;
    text-decoration: none !important;
    min-width: 150px;
`;

export const NavigationName = styled.div`
    margin-left: ${(props) => (props.isOpened ? '20px' : '-20')};
    width: ${(props) => (props.isOpened ? '150px' : '0')};
    opacity: ${(props) => (props.isOpened ? '1' : '0')};
    overflow: hidden;
    transition: width .4s, opacity .2s, margin-left .2s;
`;

export const NavigationContainer = styled.div`
    height: calc(100vh - 50px);
    background: var(--color-grey-500);
    box-sizing: border-box;
    transition: .3s;
    box-shadow: 0px 0px 6px 3px var(--color-shadow);
`;

export const NavigationList = styled.ul`
    margin: 0;
    padding: 0;
    a {
        text-decoration: none;
    }
`;

export const ItemsGroupPVP = styled.div`
    border-left: 30px solid var(--color-violet);
    position: relative;
    min-height: 40px;
    margin-left: ${(props) => (props.isOpened ? '0' : '-25px')};
    transition: .3s;
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

export const ItemsGroupSystem = styled.div`
    border-left: 30px solid var(--color-greyblue);
    position: relative;
    min-height: 80px;
    margin-left: ${(props) => (props.isOpened ? '0' : '-25px')};
    transition: .3s;
    &::after {
        content: 'SYS';
        position: absolute;
        left: -26px;
        top: 50%;
        color: var(--color-white);
        transform-origin: 0 0;
        transform: rotate(-90deg) translate(-50%, 2px);
    }
`;

export const NavigationItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--color-grey-400);
    cursor: pointer;
    
    background-color: ${({ isActive }) => (isActive ? 'var(--color-grey-800)' : 'none')};
    
    &:hover {
        ${NavigationText} {
            color: var(--color-yellow); 
        }
        
        ${NavigationIcon} {
            transition: .3s;
            border-radius: ${(props) => (props.isOpened ? '50%' : '10px')};
            box-sizing: border-box;
        } 
    }
`;

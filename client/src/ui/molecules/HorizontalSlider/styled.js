import styled, { keyframes } from 'styled-components';
import BetItem from 'ui/atoms/BetItem';
import Loader from 'ui/atoms/Loader';
import media from 'src/helpers/media';

export const Container = styled.div`
    width: 100%;
    position: relative;
`;

export const Content = styled.div`
    width: 100%;    
    transform: translateX(-${({ translatePercent }) => translatePercent}%);
    transition: transform .6s;
    will-change: transform;
`;

export const Next = styled.div`
    width: 30px;
    height: 50px;
    position: absolute;
    right: 0;
    top: calc(50% - 25px);
    background: transparent;
    z-index: 1;
    border-radius: 4px;
    transition: background-color .6s;
    will-change: background-color;
    cursor: pointer;
    
    &:hover {
      background-color: var(--color-grey-400);
    }
    
    &:after {
        content: '';
        width: 20px;
        height: 20px;
        top: 15px;
        left: 5px;
        position: absolute;
        background-color: #FFFFFF;
        clip-path: polygon(35% 0, 85% 50%, 35% 100%, 21% 89%, 60% 50%, 21% 11%);
    }
    
    ${({ isActive }) => !isActive ? `
        pointer-events: none;
        opacity: 0.5;
    ` : ''}
`;

export const Prev = styled.div`
   width: 30px;
    height: 50px;
    position: absolute;
    left: 0;
    top: calc(50% - 25px);
    background: transparent;
    z-index: 1;
    border-radius: 4px;
    transition: background-color .6s;
    will-change: background-color;
    cursor: pointer;
    
    &:hover {
      background-color: var(--color-grey-400);
    }
    
    &:active {
      background-color: var(--color-grey-800);
    }
    
    &:after {
        content: '';
        width: 20px;
        height: 20px;
        top: 15px;
        left: 5px;
        position: absolute;
        background-color: #FFFFFF;
        clip-path: polygon(65% 0, 15% 50%, 65% 100%, 79% 89%, 40% 50%, 79% 11%);
    }
    
    ${({ isActive }) => !isActive ? `
        pointer-events: none;
        opacity: 0.5;
    ` : ''}
`;

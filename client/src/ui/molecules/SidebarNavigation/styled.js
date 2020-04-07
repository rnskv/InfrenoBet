import styled, { keyframes } from 'styled-components';
import { tada, zoomInDown } from 'react-animations';


export const Circle = styled.div`
    @keyframes rotateCircle {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(-360deg);
        }
    }
    @keyframes dingle {
      0% {
        transform: rotateZ(0);
      }
      
      25% {
        transform: rotateZ(35deg);
      }
      
      75% {
        transform: rotateZ(-35deg);
      }
      
      100% {
        transform: rotateZ(0deg);
      }
    }
    
    @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.4);
        }
        100% {
          transform: scale(1);
        }
    }
    
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    
    &:after {
        content: '';
        width: 5px;
        height: 5px;
        position: absolute;
        border-radius: 50%;
        background-color: var(--color-yellow);
        top: 0;
        right: 0;
        transition: 5s;
    }
    
    &[data-isNeedAnimation=true] {
       display: block;
       animation: rotateCircle .6s ease-in-out;
    }
`;

export const Container = styled.div`
  background-color: var(--color-grey-400);
  display: flex;
  justify-content: center;
`;

export const Icon = styled.div`
  padding: 5px;
  margin: 0 5px;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid var(--color-yellow)' : '2px solid transparent')};
  cursor: pointer;
  transition: .3s;
  position: relative;
  
  svg {
    width: 27px;
    height: 27px;
    transform-origin: 50% top 0;
    fill: ${({ isActive }) => (isActive ? 'var(--color-yellow)' : 'var(--color-grey)')};
  }
  
  
  
  &[name=NOTIFICATIONS] {      
      &:after {
        content: '';
        width: 7px;
        height: 7px;
        position: absolute;
        border-radius: 50%;
        background-color: var(--color-yellow);
        display: none; 
        top: 0;
        right: 0;
      }
  }
  
  &[data-isNeedAnimation=true] {
      svg{
        animation: dingle .3s linear;
        animation-iteration-count: 7;
      }
     
       &:after {
          display: block;
          animation: pulse .7s ease-in-out;
          animation-iteration-count: 3;
       }
  }
  
  &:hover {
      svg {
          fill: var(--color-yellow);
      }
  }
`;

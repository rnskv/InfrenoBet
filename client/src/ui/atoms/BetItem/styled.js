import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';

const SIZES = {
    normal: `
      width: 95px;
      min-height: 75px;
      
      span {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 700;
      }
    `,
    small: `
        width: 55px;
        min-height: 35px;
        
        span {
            position: absolute;
            font-size: 11px;
            background: #00000063;
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 0;
        }
    `,
};

export const Container = styled.div`
  animation: .6s ${keyframes`${flipInX}`};
  background-color: ${({ cost, isActive }) => (cost ? isActive ? 'var(--color-yellow) !important' : 'var(--color-darkblue)' : 'var(--color-grey-800)')};
  ${({ size }) => SIZES[size]};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  padding: 10px 0;
  position: relative;
  opacity: ${({ isInactivity }) => (isInactivity ? '0.5' : 1)};
  pointer-events: ${({ isInactivity }) => (isInactivity ? 'none' : 'auto')};
  
  img {
    width: 60%;
    height: 60%;
    object-fit: scale-down;
  }
  
  span {
    &[hidden] {
      display: none;
    }
    
    display: ${({ cost }) => (cost ? 'flex' : 'none')};
    color: ${({ isActive }) => (isActive ? 'var(--color-grey-800)' : 'var(--color-yellow)')};
  }
  
  &:hover {
    background-color: ${({ cost }) => (cost ? 'var(--color-darkblue-active)' : 'var(--color-grey-800)')};
  }
  
  svg {
    background: #0000007a;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  ${media.tablet`
     width: 70px;
     min-height: 55px;
  `}
`;

export const Selection = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  border: 2px solid var(--color-green);
  border-radius: 10px;
  box-sizing: border-box;
  &[hidden] {
    display: none;
  }
  
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background-color: var(--color-green);
    border-radius: 50%;
    position: absolute;
    bottom: 6px;
    right: 6px;
  }
`;

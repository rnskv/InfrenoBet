import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  height: ${({ isVisible }) => (isVisible ? 'auto' : 0)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: .6s ease-in-out;
  will-change: height, opacity;
`;

export const Avatars = styled.div`
    position: absolute;
    width: 24080px;
    height: 80px;
    overflow: hidden;
    transition: transform 16000ms;
    transition-timing-function: cubic-bezier(0.32, 0.64, 0.45, 1);
    will-change: transform;
    transform: translate(${({ offset }) => `${-offset}px`}, 0);
    top: 0;
    left: 50%;
    background-color: var(--color-grey-400);
`;

export const Avatar = styled.div`
    width: 80px;
    height: 80px;
    display: inline-flex;
    justify-content: center;
    
    img {
       height: 100%;
       min-width: 100%;
       object-fit: cover;
       background-color: var(--color-white);
    }
`;

export const Arrow = styled.div`
    margin-top: 95px;
    width: 100%;
    height: 5px;
    border-bottom: 1px solid var(--color-blue-500);
    position: relative;
    &:before {
        content: '';
        width: 40px;
        height: 40px;
        background: #00bbd9;
        left: calc(50% - 20px);
        transform: rotateZ(135deg);
        border: 1px solid var(--color-blue-500);
        border-right: none;
        border-top: none;
        position: absolute;
        transition: .16s;
        top: 5px;
    }
`;

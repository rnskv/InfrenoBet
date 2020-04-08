import styled from 'styled-components';

import Button from 'ui/atoms/Button';

export const Container = styled.div`
  @keyframes leaderRotate{
    0% {
        opacity: 0;
        transform: rotateY(360deg);
    }
      
    100% {
        opacity: 1;
        transform: rotateY(0deg);
    }
  }
  
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    
    svg {
      margin: 25px;
      width: 70px;
      height: 70px;
      animation: leaderRotate .6s ease-in-out;
      background: var(--color-blue-500);
      padding: 10px;
      border-radius: 20px;
      transform-origin: 50% top;
    }
    
    div {
      display: flex;
      button {
        margin: 10px;
      }
    }
`;

export const Description = styled.p`
    color: var(--color-grey);
    max-width: 420px;
    text-align: center;
    width: 500px;
`;

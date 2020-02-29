import styled, { keyframes } from 'styled-components';
import { bounceInRight } from 'react-animations';

export const Icon = styled.div`
  border-radius: 50%;
  svg {
      width: 30px;
      height: 30px;
  }
`;

export const Container = styled.div`
  animation: .6s ${keyframes`${bounceInRight}`};
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  color: var(--color-white);
  background-color: var(--color-grey-500);
  font-size: 14px;
  border-bottom: 1px solid var(--color-grey-400);
  display: flex;
  cursor: pointer;
  &:hover {
      ${Icon} {
        transition: .6s transform;
        transform: rotateY(360deg)
      }
  }
`;


export const Title = styled.div`
`;

export const Text = styled.div`
  margin: 5px 0;
`;

export const Date = styled.div`
  font-size: 12px;
  color: var(--color-grey);
`;

export const Content = styled.div`
  margin-left: 15px;
`;

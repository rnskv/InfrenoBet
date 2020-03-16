import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';

export const Container = styled.div`
  animation: .6s ${keyframes`${flipInX}`};
  background-color: ${({ cost }) => (cost ? 'var(--color-darkblue)' : 'var(--color-grey-800)')};
  width: 95px;
  height: 95px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 60%;
    height: 60%;
    object-fit: scale-down;
  }
  
  &:hover {
    background-color: ${({ cost }) => (cost ? 'var(--color-darkblue-active)' : 'var(--color-grey-800)')};
  }
`;

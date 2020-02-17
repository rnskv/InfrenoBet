import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';

export const Container = styled.div`
  animation: .6s ${keyframes`${flipInX}`};
  background-color: ${({ value }) => (value ? 'var(--color-darkblue)' : 'var(--color-grey-800)')};
  width: 100px;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 70%;
    height: 70%;
    object-fit: scale-down;
  }
`;

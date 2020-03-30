import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';

export const Container = styled.div`
  animation: .6s ${keyframes`${flipInX}`};
  background-color: ${({ cost, isActive }) => (cost ? isActive ? 'var(--color-yellow) !important' : 'var(--color-darkblue)' : 'var(--color-grey-800)')};
  width: 95px;
  min-height: 75px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  padding: 10px 0;
  
  img {
    width: 60%;
    height: 60%;
    object-fit: scale-down;
  }
  
  span {
    color: ${({ isActive }) => (isActive ? 'var(--color-grey-800)' : 'var(--color-yellow)')};
    margin-top: 10px;
    font-size: 18px;
  }
  
  &:hover {
    background-color: ${({ cost }) => (cost ? 'var(--color-darkblue-active)' : 'var(--color-grey-800)')};
  }
  
  ${media.tablet`
     width: 70px;
     min-height: 55px;
  `}
`;

import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
 background-color: var(--color-grey-400);
 width: 100%;
`;

export const NotFound = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 svg {
  fill: var(--color-yellow);
  width: 80px;
  height: 80px;
  margin: 0 0 25px 0;
 }
 
 span {
  font-size: 26px;
  color: var(--color-white);
 }
`;

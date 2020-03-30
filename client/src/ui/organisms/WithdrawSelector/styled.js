import styled, { keyframes } from 'styled-components';
import media from 'src/helpers/media';

export const Container = styled.div`
 background-color: var(--color-grey-400);
 width: 100%;
`;

export const NotFound = styled.div`
 width: 100%;
 height: 100%;
 min-height: 300px;
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 padding: 50px;
 box-sizing: border-box;
 text-align: center;
 
 svg {
  fill: var(--color-yellow);
  width: 80px;
  height: 80px;
  margin: 0 0 25px 0;
  ${media.tablet`
      transform: rotate(90deg);
  `}
 }
 
 span {
  font-size: 26px;
  color: var(--color-white);
 }
`;

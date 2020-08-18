import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';


export const Container = styled.blockquote`
   border: 2px solid var(--color-yellow);
   box-sizing: border-box;
   height: min-content;
   position: relative;
   margin-top: 26px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const HeaderTitle = styled.div`
  background: var(--color-white);
  padding: 10px;
  color: var(--color-black);
  top: -26px;
  position: relative;
  font-size: 26px;
`;

export const Content = styled.div`
  color: var(--color-black);
  padding: 25px;
  margin: -50px 0 0 0;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
`;

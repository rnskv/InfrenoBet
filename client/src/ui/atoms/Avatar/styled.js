import styled from 'styled-components';
import { getLevelColor } from 'src/helpers/system';

export const Container = styled.div`
   width: 50px;
   height: 50px;
   color: var(--color-white);
   background: var(--color-darkblue);
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   font-size: 28px;
   font-weight: bold;
   border: 2px solid var(--color-white);
   border-radius: 50%;
   box-shadow: inset 0 0 0 6px var(--color-black);
   padding: 3px;
`;

export const Image = styled.img`
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const Level =styled.div`
  right: -11px;
  background: var(--color-grey-400);
  border: 2px solid var(--color-white);
  border-radius: 5px;
  width: 22px;
  font-size: 12px;
  position: absolute;
  color: ${({ level }) => getLevelColor(level)};
  text-align: center;
`
import styled from 'styled-components';

export const Container = styled.div`
   width: 50px;
   height: 50px;
   overflow: hidden;
   color: var(--color-white);
   background: var(--color-darkblue);
   display: flex;
   justify-content: center;
   align-items: center;
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

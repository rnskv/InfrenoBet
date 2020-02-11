import styled from 'styled-components';

export const Container = styled.div`
   width: 60px;
   height: 60px;
   overflow: hidden;
   color: var(--color-white);
   background: var(--color-darkblue);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 28px;
   font-weight: bold;
   border: 4px solid var(--color-white);
   border-radius: 50%;
   box-shadow: inset 0 0 0 6px var(--color-black);
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
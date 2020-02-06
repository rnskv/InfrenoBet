import styled from 'styled-components';

import Button from 'ui/atoms/Button';

export const Container = styled.div`
   width: 100%;
   box-sizing: border-box;
   background: var(--color-white);
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 20px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Description = styled.div`
  text-align: center;
  color: var(--color-black);
  line-height: 30px;
`;

export const Item = styled.div`
  img {
    width: 50px;
  }
`;

export const TextAvatar = styled.div`
   width: 50px;
   height: 50px;
   //background: var(--color-black);
   border-radius: 50%;
   color: var(--color-black);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 25px;
   font-weight: bold;
   border: 4px solid var(--color-grey-500);
`;

import styled, { keyframes } from 'styled-components';

import Button from 'ui/atoms/Button';
import { slideInDown } from 'react-animations';

export const Container = styled.div`
   width: 100%;
   box-sizing: border-box;
   background: var(--color-white);
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 20px;
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

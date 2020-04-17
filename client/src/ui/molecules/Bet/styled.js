import styled, { keyframes } from 'styled-components';

import Button from 'ui/atoms/Button';
import Avatar from 'ui/atoms/Avatar';
import media from 'src/helpers/media';

export const Container = styled.div`
   width: 100%;
   box-sizing: border-box;
   background: var(--color-white);
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 100px;
`;

export const StyledAvatar = styled(Avatar)`
  margin: 5px 25px;
  width: 60px;
  height: 60px;  
  background: transparent;
  box-shadow: none;
  border: 2px solid var(--color-grey-400);  
  padding: 2px;
  
  ${media.tablet`
      min-width: 30px;
      width: 30px;
      height: 30px;
  `}

`;

export const Description = styled.div`
  text-align: center;
  color: var(--color-black);
  line-height: 30px;
`;

export const Item = styled.div`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: url(/dist/resources/images/table2.png) no-repeat 0 50%;
  }
 
  width: 145px;
  position: relative;
  padding: 25px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 100px;
  align-items: center;
    
  img {
    width: 50px;
    
    ${media.tablet`
        width: 30px;
    `}
  }
`;


export const Tickets = styled.div`
    height: 100px;
    width: 50px;
    display: block;
    background: url(/dist/resources/images/ticket2.png) top right no-repeat;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--color-grey-800);
    
    span {
        display: block;
        height: 100px;
        width: 100px;
        text-align: center;
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
        position: absolute;
        right: -87px;
        top: 0;
        font-weight: bold;
        font-size: 15px;
        color: var(--gray-400);
        line-height: 0;
    }
`;

import styled from 'styled-components';

import CommonTitle from 'ui/atoms/Title';
import NumbersPlace from 'ui/atoms/NumbersPlace';
import media from 'src/helpers/media';

export const Container = styled.div`
    background: linear-gradient(180deg, var(--color-blue), var(--color-blue-500));
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled(CommonTitle)`
    display: block;
    /* width: 100%; */
    font-size: 12px;
    padding: 10px 15px;
    box-sizing: border-box;
    background: var(--color-darkblue-active);
    margin: 15px;
    align-self: self-start;
    border-radius: 5px;
    font-weight: 400;
    color: var(--color-white);

    span {
      color: var(--color-grey-active);
    }
`;

export const Timer = styled(NumbersPlace)`
  padding: 0 15px;
  height: 55px;
  border-radius: 5px;
`;

export const Or = styled.div`
  line-height: 70px;
  margin: 0 15px;
  color: var(--color-darkblue);
  font-size: 25px;
  font-weight: 700;
`;

export const Bank = styled.div`
  background: var(--color-grey-400);
  color: var(--color-yellow);
  padding: 10px 20px;
  width: 250px;
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: bold;
  border-radius: 4px;
  clip-path: polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%, 8% 50%);
  margin: 25px;
  span {
    color: var(--color-white)
  }
`;


export const ItemsCount = styled.div`
    @keyframes stripes {
      from {
        transform: translateX(0);
      }
    
      to {
        transform: translateX(-50%);
      }
    }

  width: 600px;
  height: 55px;
  background-color: var(--color-greyblue);
  text-align: center;
  font-size: 28px;
  color: var(--color-grey-400);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  ${media.tablet`
     max-width: 60%;
     min-width: 200px;
  `}
`;

export const ItemsText = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    flex-direction: column;
    span {
       display: block;
       font-size: 12px;
    }
`;

export const ItemsCountValue = styled.div`
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ percent }) => percent}%;
    height: 100%;
    overflow: hidden;
    transition: .6s;
    will-change: width;
    
    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 1200px;
        height: 100%;
        transition: .6s linear;
        will-change: width;
        background: #ffff00 url(https://csgocasino.ru/src/img/bg/zebra.png?v=9a5e4a2aea35b84340dd5c18cc041fd3) 0 0 repeat-x;
        animation: stripes 12s linear infinite;
    }
`;

export const StartGame = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  ${media.tablet`
     flex-direction: column-reverse;
  `}
`;

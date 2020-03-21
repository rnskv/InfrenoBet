import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';
import NumbersPlace from 'ui/atoms/NumbersPlace';
import Button from 'ui/atoms/Button';

export const Container = styled.div`
    animation: .6s ${keyframes`${fadeInUp}`};
    background: var(--color-blue);
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 25px;
    box-sizing: border-box;
    flex-grow: 0;
    z-index: 9;
`;

export const WinnerTicket = styled.div`
  font-weight: bold;
  color: var(--color-grey-600);
  span {
  margin-left: 10px;
    color: var(--color-white);
  }
`;

export const WinnerName = styled.div`
  font-weight: bold;
  color: var(--color-grey-600);
  span {
    margin-left: 10px;
    color: var(--color-yellow);
  }
`;

export const Winner = styled.div`
  font-size: 16px;
`;

export const WinnerItem = styled.div`
  animation: .6s ${keyframes`${fadeInUp}`};
  background: url('https://fun.csgocasino.ru/src/img/weapon-frame.png');
  width: 90px;
  height: 90px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: calc(50% - 45px);
  top: 35px;
  
  img {
    width: 50px;
  }
`;

export const NextGame = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
`;

export const Arrow = styled.div`
  width: 30px;
  height: 18px;
  background-image: url('https://fun.csgocasino.ru/src/img/sprite-arrows.png?v=08776de5804eec7e0a4d13410b7767d6');
  background-position: 0 -102px;
  position: absolute;
  top: 0;
  left: calc(50% - 15px);
  opacity: 0.9;
  &:after {
    content: '';
    display: block;
    width: 30px;
    height: 18px;
    background-image: url('https://fun.csgocasino.ru/src/img/sprite-arrows.png?v=08776de5804eec7e0a4d13410b7767d6');
    background-position: 0 -102px;
    margin-top: -6px;
    opacity: 0.7;
  }
  
  &:before {
    width: 30px;
    height: 18px;
    content: '';
    display: block;
    background-image: url('https://fun.csgocasino.ru/src/img/sprite-arrows.png?v=08776de5804eec7e0a4d13410b7767d6');
    background-position: 0 -102px;
    margin-top: 12px;
    opacity: 0.5;
  }
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  span {
    color: var(--color-grey-800);
    font-weight: bold;
  }
`;

export const TimerNumbers = styled(NumbersPlace)`
  margin-left: 10px;
  font-size: 36px;
`;

export const BankNumbers = styled(NumbersPlace)`
  margin-top: 15px;
`;

export const DepositButton = styled(Button)`
  font-size: 20px;
  margin-top: 15px;
  align-self: flex-end;
`;

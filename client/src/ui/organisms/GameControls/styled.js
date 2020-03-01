import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const StyledButton = styled(Button)`
  align-self: center;
  float: right;
  //margin-left: 150px;
  font-size: 16px;
  padding: 15px 20px;
`;

export const Container = styled.div`
    background: var(--color-white);
    border-bottom: 1px solid var(--color-grey);
    padding: 25px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
`;

export const More = styled.span`
  color: var(--color-blue);
  cursor: pointer;
  margin-left: 5px;
`;

export const Chance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 50px;
  color: var(--color-black);
   font-size: 24px;
  span {
    color: var(--color-blue);
    margin-left: 10px;
    font-size: 28px;
  }
`;

export const SplitArrow = styled.div`
    background-image: url(https://csgocasino.ru/src/img/sprite-arrows.png?v=08776de5804eec7e0a4d13410b7767d6);
    background-repeat: no-repeat;
    vertical-align: middle;
    width: 20px;
    border: none;
    background-position: 0 -142px;
    height: 60px;
`;

export const Information = styled.div`
  color: var(--color-black);
  font-size: 20px;
`;
export const ItemsCount = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const Description = styled.div`
  font-size: 12px;
  color: var(--color-greyblue);
  margin-top: 5px;
`;

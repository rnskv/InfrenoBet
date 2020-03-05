import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    background: var(--color-blue);
    padding: 25px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled(CommonTitle)`
  width: 100%;
  font-size: 15px;
`;

export const Timer = styled.div`
  color: var(--color-white);
  background-color: var(--color-grey-400);
  font-size: 30px;
  line-height: 70px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 4px;
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
  padding: 10px 50px;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: bold;
  border-radius: 4px;
  
  span {
    color: var(--color-white)
  }
`;

export const ItemsCount = styled.div`
  width: 650px;
  height: 70px;
  background-color: var(--color-grey-400);
  text-align: center;
  line-height: 70px;
  font-size: 40px;
  color: var(--color-white);
  border-radius: 4px;
`;

export const StartGame = styled.div`
  margin: 20px 0;
  display: flex;    
`;

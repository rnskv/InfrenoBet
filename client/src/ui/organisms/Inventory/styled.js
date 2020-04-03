import styled from 'styled-components';
import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const GameBlock = styled.div`
  background: url('/dist/resources/images/dota.png') center;
  background-size: 100%;
  width: 100%;
  height: 80px;
  margin-top: 25px;
  cursor: pointer;
  transition: .3s background-size;
  display: flex;
  //justify-content: center;
  align-items: center;
  
  &:hover {
    background-size: 120%;
  }
  
  div {
    width: 180px;
    margin-left: 80px;
    color: var(--color-white);
    font-size: 16px;
    
    b {
      color: var(--color-yellow)
    }
  }
  
`;

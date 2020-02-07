import styled from 'styled-components';

import Button from 'ui/atoms/Button';
import Input from 'ui/atoms/Input';
import CommonTitle from 'ui/atoms/Title';

import AuthenticationForm from 'ui/molecules/AuthenticationForm';

export const Container = styled.div`
    background: var(--color-blue);
    padding: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled(CommonTitle)`
  margin: 0 0 15px 0;
`;

export const FairGame = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  div {
    color: var(--color-white);
    background-color: var(--color-black);
    margin: 0 20px;
    padding: 5px 10px;
    border-radius: 3px;
  }
  
  span {
    color: var(--color-black);
  }
`;

import styled, { keyframes } from 'styled-components';
import Input from 'ui/atoms/Input';
import Button from 'ui/atoms/Button';

export const WithdrawInput = styled(Input)`

`;

export const Container = styled.div`
 background-color: var(--color-grey-400);
 width: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
`;

export const InputsContainer = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 ${WithdrawInput} {
  width: 45%;
 }
 
 margin: 25px 0;
`;

export const WithdrawButton = styled(Button)`
  margin-top: 25px;
  align-self: center;
  width: 200px;
`;

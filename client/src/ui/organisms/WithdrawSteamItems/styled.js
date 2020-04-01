import styled, { keyframes } from 'styled-components';
import Button from 'ui/atoms/Button';
import Title from 'ui/atoms/Title';

export const Container = styled.div`
  padding: 10px 25px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-grey-600);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 20px #00000052;
`;

export const StyledButton = styled(Button)`
  margin: 25px;
  min-width: 150px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
`;

export const StyledTitle = styled(Title)`
  margin: 25px 0;
  font-size: 20px;
`;

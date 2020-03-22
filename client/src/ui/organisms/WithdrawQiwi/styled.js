import styled, { keyframes } from 'styled-components';
import Button from 'ui/atoms/Button';

export const Container = styled.div`
  padding: 10px 25px;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledButton = styled(Button)`
  margin-left: 15px;
  min-width: 140px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
`;

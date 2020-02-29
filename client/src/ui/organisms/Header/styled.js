import styled from 'styled-components';
import Button from 'ui/atoms/Button';

export const StyledButton = styled(Button)`
  height: 40px;
  margin: 0 0 0 5px;
  &:nth-child(2) {
    margin-left: 30px;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background: var(--color-black);
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 9;
  align-items: center;
`;

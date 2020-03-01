import styled from 'styled-components';
import Button from 'ui/atoms/Button';
import Balance from 'ui/molecules/Balance';

export const StyledButton = styled(Button)`
  height: 40px;
  margin: 0 0 0 5px;
`;

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background: var(--color-black-transparent);
  position: fixed;
  display: flex;
  z-index: 9;
  align-items: center;
`;

export const Logo = styled.div`
    margin-left: -100px;
    cursor: pointer;
    svg {
      height: 30px;
    }
`;

export const StyledBalance = styled(Balance)`
  margin: 0 30px 0 10%;
`;

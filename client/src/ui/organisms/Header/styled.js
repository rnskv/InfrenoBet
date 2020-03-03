import styled from 'styled-components';
import Button from 'ui/atoms/Button';
import Balance from 'ui/molecules/Balance';

export const StyledButton = styled(Button)`
  height: 40px;
  margin: 0 0 0 5px;
`;

export const ExitButton = styled(Button)`
  padding: 8px 15px;
  justify-self: end;
`;

export const Group = styled.div`
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background: var(--color-black-transparent);
  position: fixed;
  display: flex;
  z-index: 9;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  box-sizing: border-box;
`;

export const Logo = styled.div`
    cursor: pointer;
    width: 100px;
    align-items: center;
    display: flex;
    
    svg {
      height: 40px;
    }
`;

export const StyledBalance = styled(Balance)`
  margin-right: 25px;
`;

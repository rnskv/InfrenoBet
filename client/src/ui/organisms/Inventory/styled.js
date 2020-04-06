import styled from 'styled-components';
import BetItems from 'ui/molecules/BetItems';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: calc(100% - 36px - 15px);
`;

export const StyledBetItems = styled(BetItems)`
  flex: 1;
`;

export const GameBlock = styled.div`
  background: url('/dist/resources/images/dota.png') center;
  background-size: 100%;
  height: 80px;
  transition: .3s background-size;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 25px 15px 0;
  box-sizing: border-box;
  
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  
  &:hover {
    background-size: 120%;
  }
  
  div {
    color: var(--color-white);
    font-size: 16px;
    padding-right: 10px;
   
    b {
      color: var(--color-yellow);
      margin-left: 5px;
    }
  }
  
`;

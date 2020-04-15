import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  color: var(--color-white);
  padding: 25px;
  
  button {
    width: 150px;
    height: 50px;
  }
  
  b {
    color: var(--color-yellow);
    font-size: 22px;
    display: flex;
    align-items: center;
    &:after {
      content: '';
      width: 42px;
      height: 72px;
      margin-left: 125px;
      display: inline-block;
      background: url('/dist/resources/images/header-arrow.png');
    }
  }
`;


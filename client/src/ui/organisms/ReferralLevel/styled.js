import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  margin: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--color-grey-400);
`;

export const Counter = styled.div`
  margin-top: 25px;
  color: var(--color-white);
  span {
    margin-left: 5px;
    color: var(--color-yellow);
  }
`;

export const Users = styled.div`
  display: flex;
  margin-top: 25px;
  
  h3 {
    color: var(--color-white);
    padding: 0;
    margin: 0;
  }
  
  p {
    line-height: 22px;
    color: var(--color-white);
    padding: 0 25px 0 0;
    margin: 0;
    
    b {
      color: var(--color-yellow);
    }
  }
`;

export const Wrapper = styled.div`
  width: 50%;
  box-sizing: border-box;
  h3 {
    height: 250px;
    background-color: var(--color-grey-400);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--color-grey-400);
  
  &:nth-child(odd) {
    background-color: var(--color-grey-600);
  }
`;

export const Name = styled.div`
  color: var(--color-white);
  padding: 15px;
`;

import styled from 'styled-components';
import Avatar from 'ui/atoms/Avatar';

export const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-grey-500);
  display: flex;
  align-items: center;
  z-index: 1;
  flex-direction: column;
  
  h1 {
    margin-top: 25px;
    
    span {
      color: var(--color-yellow);
    }
  }
  
  p {
    padding: 25px;
    text-align: center;
    
    span {
      margin: 0 5px;
      color: var(--color-white);
    }
  }
  
  input {
    width: 300px;
  }
  
  button {
    border-radius: 0 4px 4px 0;
    min-width: 150px;
  }
`;

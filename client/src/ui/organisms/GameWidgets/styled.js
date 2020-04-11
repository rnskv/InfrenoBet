import styled from 'styled-components';
import Checkbox from 'ui/atoms/Checkbox';

export const Container = styled.div`
  width: 250px;
  margin-top: calc(var(--header-height) + 15px);
  min-height: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: inline-flex;
  
  @media (max-width: 1470px) {
    width: 100%;
    margin-top: 25px;
    justify-content: center;
  }
`;

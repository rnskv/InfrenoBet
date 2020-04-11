import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  margin-top: calc(var(--header-height) + 15px);
  min-height: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: block;
  
  @media (max-width: 1900px) {
    width: 100%;
    margin-top: 25px;
    justify-content: center;
    display: inline-flex;
  }
`;

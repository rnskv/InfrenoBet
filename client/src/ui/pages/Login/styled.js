import styled from 'styled-components';
import Section from 'ui/atoms/Section';

export const Alternative = styled.div`
  display: flex;
  justify-content: flex-start;
  height: fit-content;
  flex-direction: column;
  color: var(--color-white);
  margin: 0 50px;
  
  span {
    margin-bottom: 25px;
    line-height: 25px;
    font-size: 14px;
  }
  
  button {
    min-width: 150px;
  }
`;

export const StyledSection = styled(Section)`
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
`;

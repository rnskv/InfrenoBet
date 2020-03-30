import styled from 'styled-components';

import CommonFooter from 'ui/molecules/Footer';

export const Footer = styled(CommonFooter)`
    background: var(--color-blue);
`;

export const FairGame = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  text-align: center;
  
  div {
    color: var(--color-white);
    background-color: var(--color-black);
    margin: 0 20px;
    padding: 5px 10px;
    border-radius: 3px;
  }
  
  span {
    color: var(--color-black);
  }
`;

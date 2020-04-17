import styled from 'styled-components';

import CommonFooter from 'ui/molecules/Footer';

export const Footer = styled(CommonFooter)`
    background: var(--color-blue);
`;

export const Icon = styled.div`
    background: url(/dist/resources/images/sprite-icons.png) 0 -1082px;
    width: 99px;
    height: 70px;
    position: absolute;
    left: 23px;
`;

export const FairGame = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  
  div {
    color: var(--color-white);
    background-color: var(--color-black);
    margin: 0 15px;
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
  }
  
  span {
    color: rgba(0, 0, 0, 0.5);
    b {
      text-decoration: underline;
      margin-left: 5px;
      font-weight: 400;
    }
  }
`;

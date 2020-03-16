import styled from 'styled-components';

import BetItems from 'ui/molecules/BetItems';
import Close from 'ui/atoms/Close';

export const StyledBetItems = styled(BetItems)`
  margin-top: 10px;
`;

export const StyledClose = styled(Close)`
  position: absolute;
  right: 100%;
`;

export const Container = styled.div`
   display: flex;
   background: red;
   position: fixed;
   right: ${({ isOpened }) => (isOpened ? '0' : '-650px')};
   top: var(--header-height);
   z-index: 11;
   height: calc(100vh - var(--header-height));
   transition: .6s right;
   box-sizing: border-box;
`;

export const RightBlock = styled.div`
  background-color: var(--color-grey-500);
  padding: 15px;
  overflow-y: auto;
  h1 {
    color: var(--color-blue);
    //background-color: var(--color-blue);
    border: 2px solid var(--color-blue);
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-transform: uppercase;
    margin: 0;
    padding: 10px 0;
  }
`;

export const LeftBlock = styled.div`
  background-color: var(--color-grey-600);
  padding: 10px;
  overflow-y: auto;
`;

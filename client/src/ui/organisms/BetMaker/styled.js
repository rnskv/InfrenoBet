import styled from 'styled-components';

import BetItems from 'ui/molecules/BetItems';
import Close from 'ui/atoms/Close';

import media from 'src/helpers/media';

export const StyledBetItems = styled(BetItems)`
  margin-top: 10px;
`;

export const StyledClose = styled(Close)`
  position: absolute;
  right: 100%;
`;

export const Container = styled.div`
   display: flex;
   position: fixed;
   right: ${({ isOpened }) => (isOpened ? '0' : '-650px')};
   top: var(--header-height);
   z-index: 11;
   max-height: calc(100vh - var(--header-height));
   min-height: calc(100vh - var(--header-height));
   transition: .6s right;
   box-sizing: border-box;
   width: 600px;
   
   ${media.tablet`
     right: ${({ isOpened }) => (isOpened ? '0' : 'calc(-100% - 50px)')};
     width: calc(100% - 50px);
     flex-direction: column;
  `}
`;

export const RightBlock = styled.div`
  background-color: var(--color-grey-500);
  padding: 15px;
  overflow-y: auto;
  width: 50%;
  box-sizing: border-box;
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
  
  ${media.tablet`
     width: 100%;
  `}
`;

export const LeftBlock = styled.div`
  width: 50%;
  box-sizing: border-box;
  background-color: var(--color-grey-600);
  padding: 10px;
  overflow-y: auto;
  ${media.tablet`
     width: 100%;
  `}
`;

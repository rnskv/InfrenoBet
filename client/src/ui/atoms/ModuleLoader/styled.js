import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-500);
  position: ${({ fullScreen }) => fullScreen ? 'fixed' : 'absolute'};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: ${({ fullScreen }) => fullScreen ? '11' : '1'};
  top: 0;
  left: 0;
`;

export const LoadingPage = styled.img`
  color: var(--color-white);
  font-size: 22px;
  width: 200px;
`;

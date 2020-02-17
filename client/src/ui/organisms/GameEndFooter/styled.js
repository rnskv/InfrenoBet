import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';

import CommonFooter from 'ui/molecules/Footer';

export const Footer = styled(CommonFooter)`
  animation: .6s ${keyframes`${flipInX}`};
  background: var(--color-green);
`;

export const Secret = styled.div`
  color: var(--color-white);
  font-size: 18px;
`;

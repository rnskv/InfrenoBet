import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';
import CommonFooter from 'ui/molecules/Footer';

export const Footer = styled(CommonFooter)`
  animation: .6s ${keyframes`${flipInX}`};
  background: var(--color-green);
  text-align: center;
`;

export const Secret = styled.div`
  color: var(--color-white);
  font-size: 18px;
  text-align: center;
`;

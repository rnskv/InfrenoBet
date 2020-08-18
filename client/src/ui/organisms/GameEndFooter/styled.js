import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import media from 'src/helpers/media';
import CommonFooter from 'ui/molecules/Footer';

export const Footer = styled(CommonFooter)`
  @keyframes items_footer_loop {
    from {
      background-position-y: 100%;
    }
    
    to {
      background-position-y: 0;
    }
  }
  
  animation: items_footer_loop 15s infinite linear;
  background: url(/dist/resources/images/guns.png) 100%;
  text-align: center;
  position: relative;
  &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(900deg,rgba(16,30,45,.31) 0,#0e1d29 85%,#0e1d29 0,#0e1d29 100%);
  }
`;

export const Secret = styled.div`
  color: var(--color-white);
  font-size: 18px;
  text-align: center;
  position: relative;
`;

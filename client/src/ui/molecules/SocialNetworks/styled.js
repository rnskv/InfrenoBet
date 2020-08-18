import styled, { keyframes } from 'styled-components';

import Button from 'ui/atoms/Button';
import Avatar from 'ui/atoms/Avatar';
import media from 'src/helpers/media';

export const Container = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: center;
`;

export const Icon = styled.div`
  cursor: pointer;
  
  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-grey);
  }
  
  &:hover {
    svg {
        fill: var(--color-yellow);
    }
  }
`;
